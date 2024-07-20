import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobPositionService } from './job-position.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { User } from '../users/decorators/user.decorator';
import { Users } from '../users/entities/users.entity';
import { JobPosition } from './entities/job-position.entity';

@Controller('job-position')
export class JobPositionController {
    constructor (private readonly jobPositionService: JobPositionService) {}

    @Post()
    create (@Body() createJobPositionDto: CreateJobPositionDto) {
        return this.jobPositionService.create(createJobPositionDto);
    }

    @Get()
    findAll (@User() user: Users): Promise<JobPosition[]> {
        return this.jobPositionService.findAll(user);
    }
}
