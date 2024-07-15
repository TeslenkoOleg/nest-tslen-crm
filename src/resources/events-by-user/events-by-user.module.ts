import { Module } from '@nestjs/common';
import { EventsByUserService } from './events-by-user.service';
import { EventsByUserController } from './events-by-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsByUser } from './entities/events-by-user.entity';
import { ErrorService } from '../../common/services/error/error.service';
import { EventsByUserRepository } from './events-by-user.repository';
import { SlackService } from '../../common/services/slack/slack.service';
import { Users } from '../users/entities/users.entity';
import { DaysOff } from '../../common/entities/DaysOff';
import { PermissionGuard } from '../../common/guards/permissioon/permission.guard';
import { APP_GUARD } from '@nestjs/core';
import { EventsByUserSubscriber } from './subscribers/events-by-user.subscriber';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EventsByUser,
            Users,
            DaysOff
        ]),
    ],
    controllers: [EventsByUserController],
    providers: [
        EventsByUserService,
        ErrorService,
        EventsByUserRepository,
        SlackService,
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
        EventsByUserSubscriber
    ],
})
export class EventsByUserModule {}
