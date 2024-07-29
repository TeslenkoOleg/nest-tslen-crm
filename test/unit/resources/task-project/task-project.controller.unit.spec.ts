import { TaskProjectController } from '../../../../src/resources/task-project/task-project.controller';
import { TestBed } from '@automock/jest';

describe('TaskProjectController', () => {
    let controller: TaskProjectController;
    beforeEach(async () => {
        const { unit } = TestBed.create(TaskProjectController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
