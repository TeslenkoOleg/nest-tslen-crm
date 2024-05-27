import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing/test';
import { AuthService } from '../../src/resources/auth/auth.service';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { SignInDto } from '../../src/resources/auth/dto/signIn.dto';
import { SignInResponseDto } from '../../src/resources/auth/dto/signIn.response.dto';
import { AuthController } from '../../src/resources/auth/auth.controller';
import { UsersService } from '../../src/resources/users/users.service';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersRepository } from '../../src/resources/users/users.repository';

const AUTH_TOKEN_OBJECT: SignInResponseDto = { accessToken: 'fake-jwt-token' };
describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByCondition: jest.fn(() => true),
          },
        },
      ],
    })
      .compile();

    authService = moduleFixture.get<AuthService>(AuthService);
    authService.signIn = jest.fn().mockResolvedValue(AUTH_TOKEN_OBJECT);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST)', () => {
    const signInDto: SignInDto = { email: 'test@example.com', password: 'password123' };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(signInDto)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toEqual(AUTH_TOKEN_OBJECT);
      });
  });
});
