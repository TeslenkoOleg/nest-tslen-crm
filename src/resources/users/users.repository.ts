import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { Users } from './entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

export class UsersRepository extends BaseAbstractRepository<Users>{
    constructor (
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    ) {
        super(usersRepository);
    }

    public async getOneWithRelations (id: number, user: Users) {
        const companyId: number = user.companyId;
        const userRole: string = user.role;
        let userId: number = user.id;
        const whereCondition: Partial<Users> = {};
        if (userRole === 'manager' || userRole === 'admin'){
            userId = id;
            whereCondition.companyId = companyId;
        }
        whereCondition.id = userId;

        const qb = this.usersRepository.createQueryBuilder('user')
            .where(whereCondition)
            .leftJoinAndSelect('user.userRelationToGroups', 'userRelationToGroups')
            .leftJoinAndSelect('user.daysOff', 'daysOff')
            .leftJoinAndSelect('user.eventsByUsers', 'eventsByUsers', 'eventsByUsers.approved != -1')
            .leftJoinAndSelect('user.eventsByUsersRequest', 'eventsByUsersRequest', 'eventsByUsersRequest.isRequest = 1')
            .leftJoinAndSelect('user.userChiefRelations', 'userChiefRelations')
            .leftJoinAndSelect('user.googleCalendars', 'googleCalendars')
            .leftJoinAndSelect('user.userProbation', 'userProbation')

        const result = await qb.getOne();

        for (let i = 0; i < result.eventsByUsers.length; i++){
            result.eventsByUsers[i].start = this.convertDateWithoutTimezoneOffset(result.eventsByUsers[i].start);
            result.eventsByUsers[i].end = this.convertDateWithoutTimezoneOffset(result.eventsByUsers[i].end);
        }

        return result
    }
    public async getByRole (user: Users, id: number = null,) {
        const qb = this.usersRepository.createQueryBuilder('user');
        const companyId: number = user.companyId;

        qb.select()
            .leftJoinAndSelect('user.eventsByUsers', 'eventsByUsers', 'eventsByUsers.approved = 1 and eventsByUsers.isGoogleEvent = 0')
            .leftJoinAndSelect('user.userProbation', 'userProbation')
            .leftJoinAndSelect('user.jobPositionDetails', 'jobPositionDetails')
            .leftJoinAndSelect('user.userChiefRelations', 'userChiefRelations.userId = user.id');
        qb.where("companyId = :companyId", { companyId: companyId })
        if (id) {
            qb.andWhere("user.id = :id", { id })
            return await qb.getOne();
        }
        qb.orderBy('user.id', "DESC")
        return await qb.getMany();
    }
    async saveOneWithRelations(data: any) {
        const oldData = Object.assign({}, data);
        // create user
        const user = await this.save(oldData);
        // get repositories
        const userRelationToGroupRepository = getRepository(UserRelationToGroup);
        const userChiefRelations = getRepository(UserChiefRelation);
        const userId = user.id;
        //save if data exist
        if (data['userRelationToGroups'] && data['userRelationToGroups'].length > 0){
            data['userRelationToGroups'] = data['userRelationToGroups'].map((item: any) => {item.userId = userId;return item});
            await userRelationToGroupRepository.save(data['userRelationToGroups']);
        }
        if (data['userChiefRelations']){
            data['userChiefRelations'] = data['userChiefRelations'].map((item: any) => {item.userId = userId;return item});
            await userChiefRelations.save(data['userChiefRelations']);
        }

        const userDaysOffRepository = getRepository('DaysOff');
        if (!data.id) { // create companyDaysOffRules if new user
            const companyDaysOffRulesRepository = getRepository('CompanyDaysOffRules');
            const companyDaysOffRules = await companyDaysOffRulesRepository.findOne({where: {companyId: user.companyId}});

            let userDaysOff = Object.assign(new DaysOff(), companyDaysOffRules);
            userDaysOff.userId = userId;
            userDaysOff.id = null;

            await userDaysOffRepository.save(userDaysOff);
        } else { // update userDaysOff if user exist
            let userDaysOff = Object.assign(new DaysOff(), oldData.daysOff);
            await userDaysOffRepository.save(userDaysOff);
        }
        ////////////////////////////user probation/////////////////////////////////////

        if (data['userProbation']){
            data['userProbation'].userId = userId;
            const userProbationRepository = getRepository(UserProbation);
            await userProbationRepository.save(data['userProbation']);
        }
        return user;
    }
    public convertDateWithoutTimezoneOffset (date: Date): any {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

}
