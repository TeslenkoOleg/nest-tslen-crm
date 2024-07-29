import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { PostsModule } from './resources/posts/posts.module';
import { EventsByUserModule } from './resources/events-by-user/events-by-user.module';
import { JobPositionModule } from './resources/job-position/job-position.module';
import { UserGroupModule } from './resources/user-group/user-group.module';
import { TaskProjectModule } from './resources/task-project/task-project.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        PostsModule,
        EventsByUserModule,
        JobPositionModule,
        UserGroupModule,
        TaskProjectModule
    ],
})
export class AppModule {}
