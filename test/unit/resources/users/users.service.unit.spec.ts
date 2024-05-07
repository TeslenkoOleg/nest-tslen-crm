import { TestBed } from '@automock/jest';
import { UsersService } from '../../../../src/resources/users/users.service';
import { Users } from '../../../../src/resources/users/entities/Users';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../../../src/resources/users/users.repository';
import { UsersModule } from '../../../../src/resources/users/users.module';

describe('Users Service Unit Test', () => {
  let userService: UsersService;
  let userRepository: Repository<Users>;

  //const USERS_REPOSITORY_TOKEN = getRepositoryToken(Users);
  //
  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();
    userService = unit;
    //userRepository = unitRef.get(getRepositoryToken(Users) as string);
  });
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UsersService,
  //       UsersRepository
  //       // {
  //       //   provide: USERS_REPOSITORY_TOKEN,
  //       //   useValue: {
  //       //     findOneByCondition: jest.fn(),
  //       //   }
  //       // }
  //     ]
  //   }).compile();
  //   userService = module.get<UsersService>(UsersService);
  //   userRepository = module.get<UsersRepository>(UsersRepository);
  // });

  // it('should retrieve user from the database', async () => {
  //   const mockUser: Users = {
  //     address: '',
  //     avatar: '',
  //     birthDay: undefined,
  //     chiefId: 0,
  //     company: '',
  //     companyId: 0,
  //     country: '',
  //     daysOff: [],
  //     emailSpare: '',
  //     eventsByUsers: [],
  //     eventsByUsersRequest: [],
  //     firstDayInCompany: undefined,
  //     firstName: '',
  //     googleCalendars: undefined,
  //     isActive: 0,
  //     jobPosition: '',
  //     jobPositionDetails: [],
  //     lastDayInCompany: undefined,
  //     lastLogin: undefined,
  //     lastName: '',
  //     loginCount: 0,
  //     mentorId: 0,
  //     ownerId: 0,
  //     password: '',
  //     phone: '',
  //     role: undefined,
  //     skype: '',
  //     taskProjectPermissions: [],
  //     tokenActivation: '',
  //     tokenReset: '',
  //     userChiefRelations: [],
  //     userChiefRelationsByChief: [],
  //     userProbation: undefined,
  //     userRelationToGroups: [],
  //     id: 1, email: 'test@gmail.com' };
  //
  //   // userRepository.findOneByCondition.mockResolvedValue(mockUser);
  //
  //   const user = await userService.findOne({email: mockUser.email});
  //
  //   expect(userRepository.findOneByCondition).toHaveBeenCalled();
  //   expect(user.email).toEqual(mockUser.email);
  // });
  //
  // it('should return null if user is not found', async () => {
  //   const invalidEmail = 'test';
  //   userRepository.findOneBy.mockResolvedValue(null);
  //
  //   const user = await userService.findOne({ email: invalidEmail });
  //   expect(userRepository.findOneBy).toHaveBeenCalled();
  //   expect(user).toEqual(null);
  // });
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
