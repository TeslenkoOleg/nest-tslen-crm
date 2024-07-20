import { UserGroupController } from '../../../../src/resources/user-group/user-group.controller';
import { TestBed } from '@automock/jest';
import { UserGroup } from '../../../../src/resources/user-group/entities/user-group.entity';
import { mockUser } from '../../../shared/users';

describe('UserGroupController', () => {
    let controller: UserGroupController;
    const mockedGroup = { id: 1, name: '' } as UserGroup;

    beforeEach(async () => {
        const { unit } = TestBed.create(UserGroupController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should create new group', async () => {
        jest.spyOn(controller, 'create').mockResolvedValue(mockedGroup);
        const result = await controller.create(mockedGroup);
        expect(controller.create).toHaveBeenCalled();
        expect(result).toEqual(mockedGroup);
    });
    it('should find all groups', async () => {
        const mockResponse = [mockedGroup];
        jest.spyOn(controller, 'findAll').mockResolvedValue(mockResponse);
        const result = await controller.findAll(mockUser);
        expect(controller.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
});
