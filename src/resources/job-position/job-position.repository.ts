import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from './entities/job-position.entity';

export class JobPositionRepository extends BaseAbstractRepository<JobPosition>{
    constructor (
    @InjectRepository(JobPosition)
    private readonly jobRepository: Repository<JobPosition>
    ) {
        super(jobRepository);
    }
}
