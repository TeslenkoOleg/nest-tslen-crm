import { Module } from '@nestjs/common';
import { TaskProjectService } from './task-project.service';
import { TaskProjectController } from './task-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskProject } from './entities/task-project.entity';
import { TaskProjectRepository } from './task-project.repository';
import { SlackService } from '../../common/services/slack/slack.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        TaskProject
    ])],
    controllers: [TaskProjectController],
    providers: [
        TaskProjectService,
        TaskProjectRepository,
        SlackService
    ],
})
export class TaskProjectModule {}
