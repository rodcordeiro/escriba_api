import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';

import { PostsEntity } from '@/modules/posts/entities/posts.entity';

@Injectable()
export class PostsService extends BaseService {
  override repository = this._repository;
  constructor(
    @Inject('POSTS_REPOSITORY')
    private _repository: Repository<PostsEntity>,
  ) {
    super();
  }
}
