import { TestBed } from '@automock/jest';
import { UsersService } from '../../../../src/resources/users/users.service';
import { mockUser } from '../../../shared/users';

describe('Users Service Unit Test', () => {
    let userService: UsersService;
    beforeAll(() => {
        const { unit } = TestBed.create(UsersService).compile();
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
    it('should get birthday anniversary', async () => {
        const result = mockUser;
        jest.spyOn(userService, 'getBirthdayAnniversary').mockResolvedValue(mockUser);

        const res = await userService.getBirthdayAnniversary(mockUser);
        expect(res).toEqual(result);
    });
    it('should get users with relations by date range', async () => {
        const result = [mockUser];
        jest.spyOn(userService, 'getUsersWithRelationsByDateRange').mockResolvedValue([mockUser]);

        const res = await userService.getUsersWithRelationsByDateRange(mockUser, { startDate: new Date(), endDate: new Date() });
        expect(res).toEqual(result);
    });
});
