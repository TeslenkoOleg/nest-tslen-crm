import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { EventsByUser } from './entities/events-by-user.entity';
import { Users } from '../users/entities/users.entity';
import { DatesRangeDto } from '../../common/dto/dates-range.dto';
import { EventsByUserRepository } from './events-by-user.repository';
import { ErrorExceptionMethod, ErrorService, IThrowErrorObject } from '../../common/services/error/error.service';

@Injectable()
export class EventsByUserService extends BaseAbstractService<EventsByUser>{
    protected currentRepository: EventsByUserRepository;
    constructor (
    protected readonly repository: EventsByUserRepository,
    private errorService: ErrorService
    ) {
        super(repository, null);
        this.currentRepository = repository;
    }
    async getEventsByMonth (user: Users, date: DatesRangeDto): Promise<EventsByUser[]> {
        try {
            return await this.currentRepository.getEventsByMonth(user, date);
        } catch (err) {
            const errorMessage = `getEventsByMonth: ${user.id}, class: ${this.constructor.name}. Message: ${err.message}`;
            const throwError: IThrowErrorObject = { method: ErrorExceptionMethod.NotFound, message: `Cannot get events by month for user: ${user.id}` };
            await this.errorService.aggregateError(
                errorMessage,
                errorMessage,
                throwError
            )
        }
    }
    async getAbsentToday (user: Users): Promise<EventsByUser[]>{
        try {
            return await this.currentRepository.getAbsentToday(user);
        } catch (err) {
            const errorMessage = `getAbsentToday: ${user.id}, class: ${this.constructor.name}. Message: ${err.message}`;
            const throwError: IThrowErrorObject = { method: ErrorExceptionMethod.NotFound, message: `Cannot get absent today for user: ${user.id}` };
            await this.errorService.aggregateError(
                errorMessage,
                errorMessage,
                throwError
            )
        }
    }
}
