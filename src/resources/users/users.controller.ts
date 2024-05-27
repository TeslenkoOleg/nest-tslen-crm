import { Controller, Get, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/Users';
import { FindOneNumberParams } from '../../common/dto/findOneNumberParams';
import { User } from './decorators/user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }


  @Get(':id')
  findOne(@User() user: Users, @Param() params: FindOneNumberParams): Promise<Users> {
    return this.usersService.findOneById(params.id, user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
