import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { UserRelationToGroup } from './entities/UserRelationToGroup';
import { UsersGroup } from './entities/UsersGroup';
import { Companies } from '../../common/entities/Companies';
import { CompanyDaysOffRules } from '../../common/entities/CompanyDaysOffRules';
import { DaysOffScheduler } from '../../common/entities/DaysOffScheduler';
import { DaysOff } from '../../common/entities/DaysOff';
import { EventsByUser } from '../../common/entities/EventsByUser';
import { UserChiefRelation } from '../../common/entities/UserChiefRelation';
import { UserProbation } from '../../common/entities/UserProbation';
import { UsersRepository } from './users.repository';

@Module({

  imports: [TypeOrmModule.forFeature([
    Users,
    UserRelationToGroup,
    UsersGroup,
    Companies,
    CompanyDaysOffRules,
    DaysOffScheduler,
    DaysOff,
    EventsByUser,
    UserChiefRelation,
    UserProbation
  ])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository
  ],
  exports: [UsersService]
})
export class UsersModule {}
