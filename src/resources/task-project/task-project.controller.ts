import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskProjectService } from './task-project.service';
import { CreateTaskProjectDto } from './dto/create-task-project.dto';
import { UpdateTaskProjectDto } from './dto/update-task-project.dto';
import { Users } from '../users/entities/users.entity';
import { User } from '../users/decorators/user.decorator';
import { TaskProject } from './entities/task-project.entity';
import { DeleteResult } from 'typeorm';

@Controller('task-project')
export class TaskProjectController {
    constructor (private readonly taskProjectService: TaskProjectService) {}

    @Post()
    create (@Body() createTaskProjectDto: CreateTaskProjectDto): Promise<TaskProject> {
        return this.taskProjectService.create(createTaskProjectDto);
    }

    @Get()
    findAll (@User() user: Users) {
        return this.taskProjectService.findAll(user);
    }

    @Get(':id([0-9]+)')
    findOne (@User() user: Users, @Param('id', ParseIntPipe) id: number): Promise<TaskProject> {
        return this.taskProjectService.findOneById(id, user);
    }

    @Patch(':id')
    update (@Param('id', ParseIntPipe) id: number, @Body() updateTaskProjectDto: UpdateTaskProjectDto): Promise<TaskProject> {
        return this.taskProjectService.update(id, updateTaskProjectDto);
    }

    @Delete(':id')
    remove (@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.taskProjectService.delete(id);
    }
}
