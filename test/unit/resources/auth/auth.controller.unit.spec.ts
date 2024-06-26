import { AuthController } from '../../../../src/resources/auth/auth.controller';
import { AuthService } from '../../../../src/resources/auth/auth.service';
import { SignInDto } from '../../../../src/resources/auth/dto/signIn.dto';
import { TestBed } from '@automock/jest';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(AuthController).compile();
        controller = unit;
        authService = unitRef.get(AuthService);
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
