import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing/test';
import { AuthGuard } from '../../src/resources/auth/guards/auth.guard';
import { mockUser } from '../shared/users';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import * as request from 'supertest';
import { JobPosition } from '../../src/resources/job-position/entities/job-position.entity';
import { JobPositionController } from '../../src/resources/job-position/job-position.controller';
import { JobPositionService } from '../../src/resources/job-position/job-position.service';
import { JobPositionRepository } from '../../src/resources/job-position/job-position.repository';

describe('Job Position (e2e)', () => {
    let app: INestApplication;
    const mockedJobPosition: Partial<JobPosition> = { id: 1, title: 'test' };
    const mockedAuthGuard = { canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser;
        return true;
    } };
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test
            .createTestingModule({
                controllers: [JobPositionController],
                providers: [
                    JobPositionService,
                    {
                        provide: JobPositionRepository,
                        useValue: {
                            findAll: jest.fn(() => [mockedJobPosition]),
                            create: jest.fn(() => mockedJobPosition),
                            update: jest.fn(() => mockedJobPosition),
                            findOne: jest.fn(() => mockedJobPosition),
                            save: jest.fn(() => mockedJobPosition),
                            delete: jest.fn(() => mockedJobPosition),
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
    it('should get all job positions', async () => {
        await request(app.getHttpServer())
            .get('/job-position')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual([mockedJobPosition]);
            });
    });
    it('should create a job position', async () => {
        await request(app.getHttpServer())
            .post('/job-position')
            .send(mockedJobPosition)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual(mockedJobPosition);
            });
    });
});
