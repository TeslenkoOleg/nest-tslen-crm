import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { Users } from './entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository extends BaseAbstractRepository<Users>{
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }

}
