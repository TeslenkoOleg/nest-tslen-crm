import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/decorators/user.decorator';
import { Users } from '../users/entities/users.entity';
import { Posts } from './entities/post.entity';
import { DeleteResult } from 'typeorm';
import { Roles } from '../../common/guards/roles/roles.decorator';
import { Role } from '../../common/guards/roles/role.enum';

@Controller('posts')
export class PostsController {
    constructor (private readonly postsService: PostsService) {}

  @Post()
  @Roles(Role.Admin)
    create (@Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.create(createPostDto);
    }

  @Get()
  findAll (@User() user: Users): Promise<Posts[]> {
      return this.postsService.findAll(user);
  }
  @Patch(':id')
  @Roles(Role.Admin)
  update (@Param('id', ParseIntPipe) id: number,
          @Body() updatePostDto: UpdatePostDto
  ): Promise<Posts> {
      return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove (@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
      return this.postsService.delete(+id);
  }
}
