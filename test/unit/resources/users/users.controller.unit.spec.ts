
import { UsersController } from '../../../../src/resources/users/users.controller';
import { TestBed } from '@automock/jest';

describe('UsersController', () => {
  let controller: UsersController;
  // let userService: jest.Mocked<UsersService>;
  // let userRepository: jest.Mocked<Repository<Users>>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();
    controller = unit;
    // userService = unitRef.get(UsersService);
    ///userRepository = unitRef.get(getRepositoryToken(Users) as string);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
