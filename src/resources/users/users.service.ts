import { Injectable } from '@nestjs/common';
import { Users } from './entities/Users';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { BaseInterfaceService } from '../../common/services/base/base.interface.service';

@Injectable()
export class UsersService extends BaseAbstractService<Users> implements BaseInterfaceService{
  protected currentRepository: UsersRepository;
  constructor(
    private readonly repository: UsersRepository,
  ) {
    super(repository);
    this.currentRepository = repository;
  }
  async hashValue(value: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(value, salt);
  }
  async compareHashedValues(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }


}
