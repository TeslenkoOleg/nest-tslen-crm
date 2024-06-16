import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CompanyDaysOffRules } from '../company-days-off-rules/entities/company-days-off-rules.entity';
import { DaysOff } from '../../common/entities/DaysOff';

export class UsersRepository extends BaseAbstractRepository<Users>{
    constructor (
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private entityManager: EntityManager,
    @InjectRepository(CompanyDaysOffRules)
    private readonly companyDaysOffRulesRepository: Repository<CompanyDaysOffRules>,
    ) {
        super(usersRepository);
    }

    public async getOneWithRelations (id: number, user: Users): Promise<Users> {
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
    public async getByRole (user: Users, id: number = null): Promise<Users[] | Users> {
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
    async createOneWithRelations (creteUserDto: CreateUserDto): Promise<Users> {
        return await this.entityManager.transaction(async transactionalEntityManager => {
            const user: Users = new Users(creteUserDto);
            await transactionalEntityManager.save(user);

            const companyDaysOffRules: CompanyDaysOffRules = await this.companyDaysOffRulesRepository.findOneBy({ companyId: user.companyId });
            const userDaysOff: DaysOff = Object.assign(new DaysOff({}), companyDaysOffRules);
            userDaysOff.userId = user.id;
            await transactionalEntityManager.save(userDaysOff);
            return user;
        });
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
    public async getBirthdayAnniversary (user: Users): Promise<Users> {
        const qb: SelectQueryBuilder<Users> = this.usersRepository.createQueryBuilder('user');
        const companyId: number = user.companyId;
        const q1: string = qb.select('concat(firstName, \' \', lastName) as name, avatar, \'birthday\' as type, birthDay as day')
            .where(`companyId = ${companyId}`)
            .andWhere("DATE_FORMAT(birthDay, '%m-%d') BETWEEN DATE_FORMAT(NOW(), '%m-%d') AND DATE_FORMAT(NOW() + INTERVAL 30 DAY, '%m-%d')")
            .getQuery();

        const q2: string = qb.select('concat(firstName, \' \', lastName) as name, avatar, \'anniversary\' as type, firstDayInCompany as day')
            .where(`companyId = ${companyId}`)
            .andWhere("DATE_FORMAT(firstDayInCompany, '%m-%d') BETWEEN DATE_FORMAT(NOW(), '%m-%d') AND DATE_FORMAT(NOW() + INTERVAL 30 DAY, '%m-%d')")
            .andWhere('DATE_FORMAT(firstDayInCompany, "%Y") != DATE_FORMAT(NOW(), "%Y")')
            .getQuery();
        return await this.entityManager.query(`${q1} UNION ${q2}`);
    }
    public async getUsersWithRelationsByDateRange (user: Users, { startDate, endDate }): Promise<Users[]> {
        const qb: SelectQueryBuilder<Users> = this.usersRepository.createQueryBuilder('user');
        const companyId = user.companyId;
        qb.select();
        qb.where("companyId = :companyId", { companyId: companyId })
            .leftJoinAndSelect('user.eventsByUsers', 'eventsByUsers',
                `eventsByUsers.approved = 1 
                          and eventsByUsers.isGoogleEvent = 0
                          and (eventsByUsers.start BETWEEN '${startDate}' AND '${endDate}'
                          or eventsByUsers.end BETWEEN '${startDate}' AND '${endDate}')`)
            .leftJoinAndSelect('user.userProbation', 'userProbation',
                `(userProbation.start BETWEEN '${startDate}' AND '${endDate}'
                          or userProbation.end BETWEEN '${startDate}' AND '${endDate}')`)
        qb.orderBy('user.id', "DESC")
        return await qb.getMany();
    }
}
