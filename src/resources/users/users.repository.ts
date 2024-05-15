import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { Users } from './entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository extends BaseAbstractRepository<Users>{
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }

  async getOneWithRelations(id: number, user: Users) {
        const managersCompanyId: number = user.companyId;
        const userRole: string = user.role;
        let userId: number = user.id;
        const whereCondition: Partial<Users> = {};
        if (userRole === 'manager' || userRole === 'admin'){
            userId = id;
            whereCondition.companyId = managersCompanyId;
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
    convertDateWithoutTimezoneOffset(date: Date): any {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

}
