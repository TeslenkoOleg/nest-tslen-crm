import { Controller, Get, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/Users';
import { OneNumberParams } from '../../common/dto/oneNumberParams';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Post()
    create (@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.create(createUserDto);
    }
    @Get()
    async findAll (@User() user: Users): Promise<Users[]> {
        return await this.usersService.findAll(user);
    }
    @Get(':id')
    findOne (@User() user: Users, @Param() params: OneNumberParams): Promise<Users> {
        return this.usersService.findOneById(params.id, user);
    }

    // @Patch(':id')
    // update (@Param('id') id: OneNumberParams, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.usersService.remove(+id);
    // }
}
