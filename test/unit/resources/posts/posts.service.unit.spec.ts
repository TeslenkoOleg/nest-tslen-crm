import { PostsService } from '../../../../src/resources/posts/posts.service';
import { TestBed } from '@automock/jest';

describe('PostsService', () => {
    let service: PostsService;

    beforeEach(async () => {
        const { unit } = TestBed.create(PostsService).compile();
        service = unit;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
