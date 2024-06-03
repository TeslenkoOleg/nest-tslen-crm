import { TestBed } from '@automock/jest';
import { UsersService } from '../../../../src/resources/users/users.service';

describe('Users Service Unit Test', () => {
    let userService: UsersService;
    beforeAll(() => {
        const { unit, unitRef } = TestBed.create(UsersService).compile();
        userService = unit;
    });
    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should hash a value', async () => {
        const value = 'test';
        const hashedValue = 'hashedValue';
        jest.spyOn(userService, 'hashValue').mockResolvedValue(hashedValue);

        const result = await userService.hashValue(value);
        expect(result).toEqual(hashedValue);
    });

    it('should compare hashed values', async () => {
        const value = 'test';
        const hashedValue = 'hashedValue';
        jest.spyOn(userService, 'compareHashedValues').mockResolvedValue(true);

        const result = await userService.compareHashedValues(value, hashedValue);
        expect(result).toEqual(true);
    });
});
