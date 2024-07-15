import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupRepository } from './user-group.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroup])],
    controllers: [UserGroupController],
    providers: [UserGroupService, UserGroupRepository],
})
export class UserGroupModule {}
