import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsByUserDto } from './create-events-by-user.dto';

export class UpdateEventsByUserDto extends PartialType(CreateEventsByUserDto) {}
