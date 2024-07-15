import { TestBed } from '@automock/jest';
import { JobPositionService } from '../../../../src/resources/job-position/job-position.service';

describe('JobPositionService', () => {
    let service: JobPositionService;

    beforeEach(async () => {
        const {unit} = TestBed.create(JobPositionService).compile();
        service = unit;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
