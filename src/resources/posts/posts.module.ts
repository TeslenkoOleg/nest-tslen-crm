import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { RolesGuard } from '../../common/guards/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts]),
    ],
    controllers: [PostsController],
    providers: [
        PostsService,
        PostsRepository,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class PostsModule {}
