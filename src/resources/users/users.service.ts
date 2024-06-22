import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { BaseInterfaceService } from '../../common/services/base/base.interface.service';
import { DatesRangeDto } from '../../common/dto/dates-range.dto';
import { SlackService } from '../../common/services/slack/slack.service';

@Injectable()
export class UsersService extends BaseAbstractService<Users> implements BaseInterfaceService{
    protected currentRepository: UsersRepository;
    constructor (
    protected readonly repository: UsersRepository,
    protected readonly slackService: SlackService
    ) {
        super(repository, slackService);
        this.currentRepository = repository;
    }
    async hashValue (value: string): Promise<string> {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hash(value, salt);
    }
    async compareHashedValues (value: string, hashedValue: string): Promise<boolean> {
        return bcrypt.compare(value, hashedValue);
    }
    public async getBirthdayAnniversary (user: Users): Promise<Users> {
        try {
            return await this.currentRepository.getBirthdayAnniversary(user);
        } catch (err) {
            const errorMessage = `getBirthdayAnniversary: ${user.id}, class: ${this.constructor.name}. Message: ${err.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot get birthday anniversary for user: ${user.id}`);
        }
    }
    public async getUsersWithRelationsByDateRange (user: Users, dateParams: DatesRangeDto): Promise<Users[]> {
        try {
            return await this.currentRepository.getUsersWithRelationsByDateRange(user, dateParams);
        } catch (err) {
            const errorMessage = `getUsersWithRelationsByDateRange: ${user.id}, class: ${this.constructor.name}. Message: ${err.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot get users with relations by date range for user: ${user.id}`);
        }
    }
}
