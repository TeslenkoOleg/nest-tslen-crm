import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Test } from '@nestjs/testing/test';
import { UsersService } from '../../src/resources/users/users.service';
import * as request from 'supertest';
import { Users } from '../../src/resources/users/entities/users.entity';
import { AuthGuard } from '../../src/resources/auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { UsersController } from '../../src/resources/users/users.controller';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UsersRepository } from '../../src/resources/users/users.repository';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    const mockedUsers: Partial<Users>[] = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Doe' },
    ]
    const mockedUserObject = { id: 1, email: '' };
    const mockedAuthGuard = { canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockedUserObject;
        return true;
    } };
    // let usersController: UsersController;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test
            .createTestingModule({
                controllers: [UsersController],
                providers: [UsersService,
                    {
                        provide: UsersRepository,
                        useValue: {
                            findAll: jest.fn(() => mockedUsers),
                        },
                    },
                ],
            })
            .overrideGuard(AuthGuard).useValue(mockedAuthGuard)
            .compile();

        // usersController = moduleFixture.get<UsersController>(UsersController);
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close(); // Properly close the NestJS application
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('/users (GET)', async () => {
        const mockUsers: Partial<Users>[] = [
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Jane', lastName: 'Doe' },
        ]
        await request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(mockUsers);
            });
    });

});
