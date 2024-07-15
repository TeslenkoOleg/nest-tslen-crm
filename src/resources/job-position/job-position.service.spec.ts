import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionService } from './job-position.service';

describe('JobPositionService', () => {
    let service: JobPositionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JobPositionService],
        }).compile();

        service = module.get<JobPositionService>(JobPositionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
