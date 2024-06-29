import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../../../../src/resources/posts/posts.controller';
import { PostsService } from '../../../../src/resources/posts/posts.service';

describe('PostsController', () => {
    let controller: PostsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [PostsService],
        }).compile();

        controller = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
