import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatesRangeDto } from '../../common/dto/dates-range.dto';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Post()
    create (@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.create(createUserDto);
    }
    @Get()
    findAll (@User() user: Users): Promise<Users[]> {
        return this.usersService.findAll(user);
    }
    @Get(':id([0-9]+)')
    findOne (@User() user: Users, @Param('id', ParseIntPipe) id: number): Promise<Users> {
        return this.usersService.findOneById(id, user);
    }
    @Patch(':id')
    update (@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.usersService.update(id, updateUserDto);
    }
    @Get('/birthday-anniversary')
    async getBirthdayAnniversary (@User() user: Users): Promise<Users> {
        return await this.usersService.getBirthdayAnniversary(user);
    }
    @Get('/get-with-relations-by-date-range')
    async readAllFromByDateRange (@User() user: Users, @Query() params: DatesRangeDto): Promise<Users[]> {
        return await this.usersService.getUsersWithRelationsByDateRange(user, params);
    }
}
