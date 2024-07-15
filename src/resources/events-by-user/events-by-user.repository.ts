import { EventsByUser } from './entities/events-by-user.entity';
import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { DatesRangeDto } from '../../common/dto/dates-range.dto';
import { DaysOff } from '../../common/entities/DaysOff';
import { CreateEventsByUserDto } from './dto/create-events-by-user.dto';
import { UpdateEventsByUserDto } from './dto/update-events-by-user.dto';

export class EventsByUserRepository extends BaseAbstractRepository<EventsByUser>{
    constructor (
    @InjectRepository(EventsByUser)
    private readonly eventsByUserRepository: Repository<EventsByUser>,
    private entityManager: EntityManager,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(DaysOff)
    private readonly daysOffRepository: Repository<DaysOff>
    ) {
        super(eventsByUserRepository);
    }
    async getEventsByMonth (user: Users, date: DatesRangeDto): Promise<EventsByUser[]>{
        const companyId: number = user.companyId;
        const firstDay: string = date.startDate.toISOString();
        const lastDay: string = date.endDate.toISOString();
        const q1 = this.eventsByUserRepository.createQueryBuilder('ebu')
            .select([`
                u.id,
                u.avatar,
                u.firstName,
                u.lastName,
                ebu.requestType,
                ebu.start as start,
                ebu.end as end,
                MONTH(start) - MONTH(end) as monthBoundaryStatus,
                DATEDIFF(end, start) + 1 as dateDiff,
                TIME_TO_SEC(TIMEDIFF(end, start)) as timeDiff,
                ebu.approved as approved
                `
            ])
            .leftJoin(Users, 'u', 'u.id = ebu.userId')
            .where(`ebu.requestType != 'own'`)
            .andWhere(`u.companyId = ${companyId}`)
            .andWhere(`(
               (start >= '${firstDay}' and start <= '${lastDay}')
            or (end >= '${firstDay}' and end <= '${lastDay}')
            )`)
            .andWhere(`ebu.approved != -1`)
            .getQuery()
        const q2 = this.usersRepository.createQueryBuilder('u')
            .select([
                `   u.id,
                    u.avatar,
                    u.firstName,
                    u.lastName,
                    0 as requestType,
                    0 as start,
                    0 as end,
                    0 as monthBoundaryStatus,
                    0 as dateDiff,
                    0 as timeDiff,
                    0 as approved`
            ])
            .where(`companyId = ${companyId}`).getQuery();
        return await this.entityManager.query(`${q1} UNION ${q2}`);
    }
    async getAbsentToday (user: Users): Promise<EventsByUser[]>{
        const companyId: number = user.companyId;
        const q = this.eventsByUserRepository.createQueryBuilder('ebu')
            .select([`
                concat(u.firstName, ' ', u.lastName) as name,
                requestType as type,
                u.avatar as avatar
                `
            ])
            .leftJoin(Users, 'u', 'u.id = ebu.userId')
            .where(`ebu.requestType != 'own'`)
            .andWhere(`u.companyId = ${companyId}`)
            .andWhere(`ebu.approved = 1`)
            .andWhere(`NOW() BETWEEN start AND end`)
        return await q.getRawMany();
    }
    async deleteOneWithRelations (id: number, entity: EventsByUser): Promise<DeleteResult> {
        return await this.entityManager.transaction(async transactionalEntityManager => {
            // return daysOff if event is request and not approved
            if (entity.isRequest && entity.approved === 0){
                const requestType: string = entity.requestType;
                const timeOffset: number = entity.timeOffset;
                const currentDaysOff: DaysOff = await this.daysOffRepository.findOneOrFail({
                    where: { userId: entity.userId }
                });
                currentDaysOff[requestType] = +currentDaysOff[requestType] + timeOffset;
                // save new daysOff
                await this.daysOffRepository.save(currentDaysOff);
            }
            // TODO: add google calendar integration
            return await transactionalEntityManager.delete(EventsByUser, id);
        })
    }
    async createOneWithRelations (data: CreateEventsByUserDto, user: Users) {
        return this.entityManager.transaction(async transactionalEntityManager => {
            data.userId = user.id;
            // TODO: change color object on front side
            const eventEntity = new EventsByUser(data);
            const event = await transactionalEntityManager.save(eventEntity);
            if (event.isRequest){
                await transactionalEntityManager.decrement(DaysOff, { userId: data.userId }, event.requestType, 1);
            }
            // TODO: add google integration
            // TODO: add a mail service
            return event
        });
    }
    async updateOneWithRelations (entityData: UpdateEventsByUserDto) {
        return this.entityManager.transaction(async transactionalEntityManager => {
            const event = await transactionalEntityManager.save(entityData);
            return event
        });
    }
}
