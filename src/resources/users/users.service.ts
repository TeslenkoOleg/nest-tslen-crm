import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { BaseInterfaceService } from '../../common/services/base/base.interface.service';

@Injectable()
export class UsersService extends BaseAbstractService<Users> implements BaseInterfaceService{
  constructor(
    private readonly repository: UsersRepository,
  ) {
    super(repository);
  }
  async hashValue(value: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(value, salt);
  }
  async compareHashedValues(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
