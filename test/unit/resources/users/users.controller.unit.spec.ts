
import { UsersController } from '../../../../src/resources/users/users.controller';
import { TestBed } from '@automock/jest';
import { UsersService } from '../../../../src/resources/users/users.service';
import { Users } from '../../../../src/resources/users/entities/users.entity';

describe('UsersController', () => {
    let controller: UsersController;
    let userService: jest.Mocked<UsersService>;

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(UsersController).compile();
        controller = unit;
        userService = unitRef.get(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it ('should call userService.findAll', async () => {
        const mockResponse: Partial<Users>[] = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'test' },
        ];

        jest.spyOn(userService, 'findAll').mockResolvedValue(mockResponse as Users[]);

        const result = await controller.findAll();
        expect(userService.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    })

    it ('should call userService.findOneById', async () => {
        const mockResponse: Partial<Users> = { id: 1, firstName: 'John', lastName: 'Doe', email: 'test' };

        jest.spyOn(userService, 'findOneById').mockResolvedValue(mockResponse as Users);

        const result = await controller.findOne({} as Users, { id: 1 });
        expect(userService.findOneById).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    })
});
