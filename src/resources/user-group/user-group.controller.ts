import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { Users } from '../users/entities/users.entity';
import { User } from '../users/decorators/user.decorator';
import { UserGroup } from './entities/user-group.entity';

@Controller('groups')
export class UserGroupController {
    constructor (private readonly userGroupService: UserGroupService) {}

    @Post()
    create (@Body() createUserGroupDto: CreateUserGroupDto): Promise<UserGroup> {
        return this.userGroupService.create(createUserGroupDto);}

    @Get()
    findAll (@User() user: Users): Promise<UserGroup[]> {
        return this.userGroupService.findAll(user);
    }
}
