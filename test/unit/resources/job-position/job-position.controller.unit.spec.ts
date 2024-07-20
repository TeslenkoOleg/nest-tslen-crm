import { JobPositionController } from '../../../../src/resources/job-position/job-position.controller';
import { TestBed } from '@automock/jest';
import { JobPosition } from '../../../../src/resources/job-position/entities/job-position.entity';
import { mockUser } from '../../../shared/users';

describe('JobPositionController', () => {
    let controller: JobPositionController;
    const mockedJobPosition = { id: 1, title: 'test' } as JobPosition;

    beforeEach(async () => {
        const { unit } = TestBed.create(JobPositionController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should call jobPositionService.create', async () => {
        jest.spyOn(controller, 'create').mockResolvedValue(mockedJobPosition);
        const result = await controller.create(mockedJobPosition);
        expect(controller.create).toHaveBeenCalled();
        expect(result).toEqual(mockedJobPosition);
    });
    it('should call jobPositionService.findAll', async () => {
        const mockResponse = [mockedJobPosition];
        jest.spyOn(controller, 'findAll').mockResolvedValue(mockResponse);
        const result = await controller.findAll(mockUser);
        expect(controller.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
});
