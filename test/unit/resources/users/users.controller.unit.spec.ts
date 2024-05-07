import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../../src/resources/users/users.controller';
import { UsersService } from '../../../../src/resources/users/users.service';
import { TestBed } from '@automock/jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../../../src/resources/users/entities/Users';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: jest.Mocked<UsersService>;
  let userRepository: jest.Mocked<Repository<Users>>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();
    controller = unit;
    userService = unitRef.get(UsersService);
    ///userRepository = unitRef.get(getRepositoryToken(Users) as string);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
