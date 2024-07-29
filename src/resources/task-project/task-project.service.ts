import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { TaskProject } from './entities/task-project.entity';
import { TaskProjectRepository } from './task-project.repository';
import { SlackService } from '../../common/services/slack/slack.service';

@Injectable()
export class TaskProjectService extends BaseAbstractService<TaskProject>{
    protected currentRepository: TaskProjectRepository;
    constructor (
    protected readonly repository: TaskProjectRepository,
    protected readonly slackService: SlackService
    ) {
        super(repository, slackService);
        this.currentRepository = repository;
    }
}
