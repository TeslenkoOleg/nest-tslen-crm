import { TaskProjectService } from '../../../../src/resources/task-project/task-project.service';
import { TestBed } from '@automock/jest';

describe('TaskProjectService', () => {
    let service: TaskProjectService;

    beforeEach(async () => {
        const { unit } = TestBed.create(TaskProjectService).compile();
        service = unit;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
