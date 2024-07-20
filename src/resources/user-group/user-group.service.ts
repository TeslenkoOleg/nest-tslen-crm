import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupRepository } from './user-group.repository';

@Injectable()
export class UserGroupService extends BaseAbstractService<UserGroup>{
    protected currentRepository: UserGroupRepository;
    constructor (
    protected readonly repository: UserGroupRepository
    ) {
        super(repository, null);
        this.currentRepository = repository;
    }
}
