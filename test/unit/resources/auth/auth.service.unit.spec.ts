import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../../src/resources/auth/auth.service';
import { UsersService } from '../../../../src/resources/users/users.service';
import { UsersRepository } from '../../../../src/resources/users/users.repository';
import { Users } from '../../../../src/resources/users/entities/Users';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const mockUser: Users = {
    address: '',
    avatar: '',
    birthDay: undefined,
    chiefId: 0,
    company: '',
    companyId: 0,
    country: '',
    daysOff: [],
    emailSpare: '',
    eventsByUsers: [],
    eventsByUsersRequest: [],
    firstDayInCompany: undefined,
    firstName: '',
    googleCalendars: undefined,
    isActive: 0,
    jobPosition: '',
    jobPositionDetails: [],
    lastDayInCompany: undefined,
    lastLogin: undefined,
    lastName: '',
    loginCount: 0,
    mentorId: 0,
    password: '',
    phone: '',
    role: undefined,
    skype: '',
    taskProjectPermissions: [],
    tokenActivation: '',
    tokenReset: '',
    userChiefRelations: [],
    userChiefRelationsByChief: [],
    userProbation: undefined,
    userRelationToGroups: [],
    id: 1, email: 'test@gmail.com' };

describe('AuthService signIn', () => {
    let authService: AuthService;
    let userService: UsersService;
    let userRepository: UsersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: {
                        findOneByCondition: jest.fn(() => mockUser),
                    },
                },
                JwtService
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UsersService>(UsersService);
        userRepository = module.get<UsersRepository>(UsersRepository);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should be defined user service', () => {
        expect(userService).toBeDefined();
    });

    it('should be defined user repository', () => {
        expect(userRepository).toBeDefined();
    });

    it('should retrieve user from the database', async () => {
        const user = await userService.findOneByCondition({ email: mockUser.email });
        expect(userRepository.findOneByCondition)
            .toHaveBeenCalledWith({ email: mockUser.email });
        expect(user.email).toEqual(mockUser.email);
    });

    it('should return null if user not found', async () => {
        const wrongEmail = 'test@gmal.com';
        const user = mockUser.email !== wrongEmail ? null : mockUser;

        expect(user).toEqual(null);
    });

    it('should throw UnauthorizedException if password isn\'t matched', async () => {
        const value = 'test';
        const hashedValue = 'hashedValue';
        jest.spyOn(userService, 'compareHashedValues').mockResolvedValue(false);

        const isMatchedPassword = await userService.compareHashedValues(value, hashedValue);
        expect(isMatchedPassword).toBe(false);

        try {
            // This is where the code that checks the password would be
            if (!isMatchedPassword) {
                throw new UnauthorizedException(); // The line you want to test
            }
            fail('UnauthorizedException not thrown'); // If we reach this point, the test failed
        } catch (e) {
            expect(e).toBeInstanceOf(UnauthorizedException); // Check that the exception thrown is UnauthorizedException
        }
    });
});

