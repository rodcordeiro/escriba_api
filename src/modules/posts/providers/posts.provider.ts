import { DataSource } from 'typeorm';
import { PostsEntity } from '../entities/posts.entity';

export const postsProviders = [
  {
    provide: 'POSTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PostsEntity),
    inject: ['DATA_SOURCE'],
  },
];
