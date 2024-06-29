import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { Posts } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PostsRepository extends BaseAbstractRepository<Posts>{
  constructor (
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>
    ) {
        super(postsRepository);
    }
}
