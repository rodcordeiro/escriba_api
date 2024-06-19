import { Module } from '@nestjs/common';

import { PostsController } from '@/modules/posts/controllers/posts.controller';
import { PostsService } from '@/modules/posts/services/posts.service';
import { postsProviders } from './providers/posts.provider';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [...postsProviders, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
