import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { JobPosition } from './entities/job-position.entity';
import { JobPositionRepository } from './job-position.repository';

@Injectable()
export class JobPositionService extends BaseAbstractService<JobPosition>{
    protected currentRepository: JobPositionRepository;
    constructor (
    protected readonly repository: JobPositionRepository
    ) {
        super(repository, null);
        this.currentRepository = repository;
    }
}
