import { UserGroupService } from '../../../../src/resources/user-group/user-group.service';
import { TestBed } from '@automock/jest';

describe('UserGroupService', () => {
    let service: UserGroupService;

    beforeEach(() => {
        const { unit } = TestBed.create(UserGroupService).compile();
        service = unit;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
