import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Test } from '@nestjs/testing/test';
import * as request from 'supertest';
import { AuthGuard } from '../../src/resources/auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { TestingModule } from '@nestjs/testing/testing-module';
import { mockUser } from '../shared/users';
import { mockedEventByUser } from '../shared/event-by-user';
import { EventsByUserController } from '../../src/resources/events-by-user/events-by-user.controller';
import { EventsByUserService } from '../../src/resources/events-by-user/events-by-user.service';
import { EventsByUserRepository } from '../../src/resources/events-by-user/events-by-user.repository';
import { ErrorService } from '../../src/common/services/error/error.service';
import { SlackService } from '../../src/common/services/slack/slack.service';
import { PermissionGuard } from '../../src/common/guards/permissioon/permission.guard';

describe('EventByUserController (e2e)', () => {
    let app: INestApplication;
    const mockedAuthGuard = { canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser;
        return true;
    } };
    const mockedPermissionGuard = { canActivate: () => {return true;} };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test
            .createTestingModule({
                controllers: [EventsByUserController],
                providers: [
                    EventsByUserService,
                    {
                        provide: EventsByUserRepository,
                        useValue: {
                            findAll: jest.fn(() => [mockedEventByUser]),
                            findOne: jest.fn(() => mockedEventByUser),
                            create: jest.fn(() => mockedEventByUser),
                            getEventsByMonth: jest.fn(() => [mockedEventByUser]),
                            getAbsentToday: jest.fn(() => [mockedEventByUser]),
                            deleteOneWithRelations: jest.fn(() => mockedEventByUser),
                            createOneWithRelations: jest.fn(() => mockedEventByUser),
                            updateOneWithRelations: jest.fn(() => mockedEventByUser),
                        },
                    },
                    ErrorService,
                    {
                        provide: SlackService,
                        useValue: {
                            send: jest.fn(),
                            sendError: jest.fn(),
                            sendWarning: jest.fn(),
                            sendInfo: jest.fn(),
                        }
                    }
                ],
            })
            .overrideGuard(AuthGuard).useValue(mockedAuthGuard)
            .overrideGuard(PermissionGuard).useValue(mockedPermissionGuard)
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
    it('events-by-user/events-by-month (GET)', async () => {
        await request(app.getHttpServer())
            .get('/events-by-user/events-by-month')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual([mockedEventByUser]);
            });
    });
    it('events-by-user/absent-today (GET)', async () => {
        await request(app.getHttpServer())
            .get('/events-by-user/absent-today')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual([mockedEventByUser]);
            });
    });
    it('events-by-user (POST)', async () => {
        await request(app.getHttpServer())
            .post('/events-by-user')
            .send(mockedEventByUser)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual(mockedEventByUser);
            });
    });
    it('events-by-user/:id (PATCH)', async () => {
        await request(app.getHttpServer())
            .patch('/events-by-user/1')
            .send(mockedEventByUser)
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(mockedEventByUser);
            });
    });
    it('events-by-user/:id (DELETE)', async () => {
        await request(app.getHttpServer())
            .delete('/events-by-user/1')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(mockedEventByUser);
            });
    });
});
