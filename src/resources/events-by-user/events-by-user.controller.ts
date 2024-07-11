import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe, Get, Query } from '@nestjs/common';
import { EventsByUserService } from './events-by-user.service';
import { CreateEventsByUserDto } from './dto/create-events-by-user.dto';
import { UpdateEventsByUserDto } from './dto/update-events-by-user.dto';
import { DeleteResult } from 'typeorm';
import { EventsByUser } from './entities/events-by-user.entity';
import { User } from '../users/decorators/user.decorator';
import { Users } from '../users/entities/users.entity';
import { DatesRangeDto } from '../../common/dto/dates-range.dto';
import { Permission } from '../../common/guards/permissioon/permission.enum';
import { Permissions } from '../../common/guards/permissioon/permission.decorator';

@Controller('events-by-user')
export class EventsByUserController {
    constructor (private readonly eventsByUserService: EventsByUserService) {}

    @Post()
    async create (
      @Body() createEventsByUserDto: CreateEventsByUserDto,
      @User() user: Users
    ): Promise<EventsByUser>{
        return this.eventsByUserService.create(createEventsByUserDto, user);
    }

    @Patch(':id')
    @Permissions(Permission.Id, Permission.UserId)
    async update (
      @Param('id', ParseIntPipe) id: number,
      @Body() updateEventsByUserDto: UpdateEventsByUserDto
    ): Promise<EventsByUser> {
        return await this.eventsByUserService.update(+id, updateEventsByUserDto);
    }

    @Delete(':id')
    async delete (@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return await this.eventsByUserService.delete(+id);
    }

  @Get('/events-by-month')
    async getEventsByMonth (@User() user: Users, @Query() params: DatesRangeDto): Promise<EventsByUser[]> {
        return await this.eventsByUserService.getEventsByMonth(user, params);
    }
  @Get('/absent-today')
  async getAbsentToday (@User() user: Users): Promise<EventsByUser[]> {
      return await this.eventsByUserService.getAbsentToday(user);
  }
}
