import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { Posts } from './entities/post.entity';
import { BaseInterfaceService } from '../../common/services/base/base.interface.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService extends BaseAbstractService<Posts> implements BaseInterfaceService{
    protected currentRepository: PostsRepository;
    constructor (
    protected readonly repository: PostsRepository
    ) {
        super(repository, null);
        this.currentRepository = repository;
    }
}
