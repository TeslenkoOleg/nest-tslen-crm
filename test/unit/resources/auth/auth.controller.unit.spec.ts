import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/resources/auth/auth.controller';
import { AuthService } from '../../../../src/resources/auth/auth.service';
import { UsersService } from '../../../../src/resources/users/users.service';
import { UsersRepository } from '../../../../src/resources/users/users.repository';
import { SignInDto } from '../../../../src/resources/auth/dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByCondition: jest.fn(),
          }
        },
        JwtService
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.signIn with correct parameters', async () => {
    const signInDto: SignInDto = { email: 'test@example.com', password: 'password123' };

    // Mock the expected response from the service
    const mockResponse = { accessToken: 'sampleToken' };

    jest.spyOn(authService, 'signIn').mockResolvedValue(mockResponse);

    const result = await controller.signIn(signInDto);
    // Verify the AuthService.signIn method is called with the correct parameters
    expect(authService.signIn).toHaveBeenCalledWith('test@example.com', 'password123');

    // Verify the expected response from the controller
    expect(result).toEqual(mockResponse);
  });
});
