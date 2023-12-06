import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@/modules/users/users.module';

import { PostsControllers } from '@/modules/posts/controllers/posts.controller';
import { PostsEntity } from '@/modules/posts/entities/post.entity';
import { PostsService } from '@/modules/posts/services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity]), UsersModule],
  controllers: [PostsControllers],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
