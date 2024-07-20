import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroup } from './entities/user-group.entity';

export class UserGroupRepository extends BaseAbstractRepository<UserGroup>{
    constructor (
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>
    ) {
        super(userGroupRepository);
    }
}
