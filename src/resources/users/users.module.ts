import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserRelationToGroup } from './entities/UserRelationToGroup';
import { UsersGroup } from './entities/UsersGroup';
import { Companies } from '../../common/entities/Companies';
import { CompanyDaysOffRules } from '../company-days-off-rules/entities/company-days-off-rules.entity';
import { DaysOffScheduler } from '../../common/entities/DaysOffScheduler';
import { DaysOff } from '../../common/entities/DaysOff';
import { UserChiefRelation } from '../../common/entities/UserChiefRelation';
import { UserProbation } from '../../common/entities/UserProbation';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { SlackService } from '../../common/services/slack/slack.service';
@Module({

    imports: [TypeOrmModule.forFeature([
        Users,
        UserRelationToGroup,
        UsersGroup,
        Companies,
        CompanyDaysOffRules,
        DaysOffScheduler,
        DaysOff,
        UserChiefRelation,
        UserProbation
    ])
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        JwtService,
        SlackService
    ],
    exports: [UsersService]
})
export class UsersModule {}
