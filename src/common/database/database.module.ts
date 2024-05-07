import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TaskProjectPermission } from '../entities/TaskProjectPermission';
import { GoogleCalendar } from '../entities/GoogleCalendar';
import { JobPosition } from '../entities/JobPosition';
import { TaskProject } from '../entities/TaskProject';
import { TaskPhase } from '../entities/TaskPhase';
import { Tasks } from '../entities/Tasks';
import { ProjectPhasesRelation } from '../entities/ProjectPhasesRelation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_SCHEMA'),
        autoLoadEntities: true,
        entities: [
          TaskProjectPermission,
          GoogleCalendar,
          JobPosition,
          TaskProject,
          TaskPhase,
          Tasks,
          ProjectPhasesRelation
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
