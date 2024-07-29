import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskProjectDto } from './create-task-project.dto';

export class UpdateTaskProjectDto extends PartialType(CreateTaskProjectDto) {}
