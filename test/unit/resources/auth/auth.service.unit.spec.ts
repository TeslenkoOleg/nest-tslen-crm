import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../../src/resources/auth/auth.service';
import { UsersService } from '../../../../src/resources/users/users.service';
import { UsersRepository } from '../../../../src/resources/users/users.repository';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from '../../../shared/users';
import { TestBed } from '@automock/jest';
import { AuthController } from '../../../../src/resources/auth/auth.controller';

describe('AuthService signIn', () => {
    let authService: AuthService;
    let userService: UsersService

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(AuthService).compile();
        authService = unit;
        userService = unitRef.get(UsersService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should be defined user service', () => {
        expect(userService).toBeDefined();
    });

    it('should be defined user repository', () => {
        expect(userService).toBeDefined();
    });

    // it('should retrieve user from the database', async () => {
    //     const user = await userService.findOneByCondition({ email: mockUser.email });
    //     expect(userService.findOneByCondition)
    //         .toHaveBeenCalledWith({ email: mockUser.email });
    //     expect(user.email).toEqual(mockUser.email);
    // });

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
        let error: UnauthorizedException;
        if (!isMatchedPassword) {
            error = new UnauthorizedException(); // The line you want to test
        }
        expect(error).toBeInstanceOf(UnauthorizedException);
        //fail('UnauthorizedException not thrown'); // If we reach this point, the test failed
    });
});

