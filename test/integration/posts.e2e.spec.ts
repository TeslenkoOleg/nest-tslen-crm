import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing/test';
import { AuthGuard } from '../../src/resources/auth/guards/auth.guard';
import { mockUser } from '../shared/users';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { PostsRepository } from '../../src/resources/posts/posts.repository';
import { Posts } from '../../src/resources/posts/entities/post.entity';
import * as request from 'supertest';
import { PostsController } from '../../src/resources/posts/posts.controller';
import { PostsService } from '../../src/resources/posts/posts.service';

describe('PostsController (e2e)', () => {
    let app: INestApplication;
    const mockedPosts: Partial<Posts> = { id: 1, text: 'Hello, World!' };
    const mockedAuthGuard = { canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser;
        return true;
    } };
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test
            .createTestingModule({
                controllers: [PostsController],
                providers: [PostsService,
                    {
                        provide: PostsRepository,
                        useValue: {
                            findAll: jest.fn(() => [mockedPosts]),
                            create: jest.fn(() => mockedPosts),
                            update: jest.fn(() => mockedPosts),
                            findOne: jest.fn(() => mockedPosts),
                            save: jest.fn(() => mockedPosts),
                            delete: jest.fn(() => mockedPosts),
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
    it('should get all posts', async () => {
        await request(app.getHttpServer())
            .get('/posts')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual([mockedPosts]);
            });
    });
    it('should create a post', async () => {
        await request(app.getHttpServer())
            .post('/posts')
            .send(mockedPosts)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual(mockedPosts);
            });
    });
    it('should update a post', async () => {
        await request(app.getHttpServer())
            .patch('/posts/1')
            .send(mockedPosts)
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(mockedPosts);
            });
    });
    it('should delete a post', async () => {
        await request(app.getHttpServer())
            .delete('/posts/1')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual(mockedPosts);
            });
    });
});
