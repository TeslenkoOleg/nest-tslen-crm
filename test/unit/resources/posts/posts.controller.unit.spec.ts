import { PostsController } from '../../../../src/resources/posts/posts.controller';
import { TestBed } from '@automock/jest';
import { Posts } from '../../../../src/resources/posts/entities/post.entity';
import { mockUser } from '../../../shared/users';
import { DeleteResult } from 'typeorm';

describe('PostsController', () => {
    let controller: PostsController;
    const mockPost = { id: 1, text: 'test' } as Posts;

    beforeEach(async () => {
        const { unit } = TestBed.create(PostsController).compile();
        controller = unit;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should call postsService.create', async () => {
        jest.spyOn(controller, 'create').mockResolvedValue(mockPost);
        const result = await controller.create(mockPost);
        expect(controller.create).toHaveBeenCalled();
        expect(result).toEqual(mockPost);
    });
    it('should call postsService.findAll', async () => {
        const mockResponse = [mockPost];
        jest.spyOn(controller, 'findAll').mockResolvedValue(mockResponse);
        const result = await controller.findAll(mockUser);
        expect(controller.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
    it('should call postsService.update', async () => {
        jest.spyOn(controller, 'update').mockResolvedValue(mockPost);
        const result = await controller.update(1, mockPost);
        expect(controller.update).toHaveBeenCalled();
        expect(result).toEqual(mockPost);
    });
    it('should call postsService.delete', async () => {
        jest.spyOn(controller, 'remove').mockResolvedValue({ affected: 1 } as DeleteResult);
        const result = await controller.remove(1);
        expect(controller.remove).toHaveBeenCalled();
        expect(result).toEqual({ affected: 1 });
    });
});
