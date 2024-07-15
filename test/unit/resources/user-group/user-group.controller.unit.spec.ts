import { UserGroupController } from '../../../../src/resources/user-group/user-group.controller';
import { TestBed } from '@automock/jest';

describe('UserGroupController', () => {
    let controller: UserGroupController;

    beforeEach(async () => {
        const {unit} = TestBed.create(UserGroupController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
