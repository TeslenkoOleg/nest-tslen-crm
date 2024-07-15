import { JobPositionController } from '../../../../src/resources/job-position/job-position.controller';
import { TestBed } from '@automock/jest';

describe('JobPositionController', () => {
    let controller: JobPositionController;

    beforeEach(async () => {
        const {unit} = TestBed.create(JobPositionController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
