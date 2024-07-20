import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing/test';
import { AuthGuard } from '../../src/resources/auth/guards/auth.guard';
import { mockUser } from '../shared/users';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import * as request from 'supertest';
import { UserGroup } from '../../src/resources/user-group/entities/user-group.entity';
import { UserGroupService } from '../../src/resources/user-group/user-group.service';
import { UserGroupController } from '../../src/resources/user-group/user-group.controller';
import { UserGroupRepository } from '../../src/resources/user-group/user-group.repository';

describe('User group (e2e)', () => {
    let app: INestApplication;
    const mockedPartialEntity: Partial<UserGroup> = { id: 1, name: 'test' };
    const mockedAuthGuard = { canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser;
        return true;
    } };
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test
            .createTestingModule({
                controllers: [UserGroupController],
                providers: [
                    UserGroupService,
                    {
                        provide: UserGroupRepository,
                        useValue: {
                            findAll: jest.fn(() => [mockedPartialEntity]),
                            create: jest.fn(() => mockedPartialEntity),
                            update: jest.fn(() => mockedPartialEntity),
                            findOne: jest.fn(() => mockedPartialEntity),
                            save: jest.fn(() => mockedPartialEntity),
                            delete: jest.fn(() => mockedPartialEntity),
                        },
                    }
                ],
            })
            .overrideGuard(AuthGuard)
            .useValue(mockedAuthGuard)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close(); // Properly close the NestJS application
    });
    it('should be defined', () => {
        expect(app).toBeDefined();
    });
    it('should get all user groups', async () => {
        await request(app.getHttpServer())
            .get('/groups')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual([mockedPartialEntity]);
            });
    });
    it('should create an user group', async () => {
        await request(app.getHttpServer())
            .post('/groups')
            .send(mockedPartialEntity)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual(mockedPartialEntity);
            });
    });
});
