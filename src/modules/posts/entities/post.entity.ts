import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';

import { UsersEntity } from '@/modules/users/entities/users.entity';

@Entity({ name: 'escriba_tb_posts' })
export class PostsEntity extends BaseEntity {
  /** Columns */
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  text: string;

  /** Joins */
  @ManyToOne(() => UsersEntity, user => user.posts)
  @JoinColumn()
  owner: UsersEntity;

  /** Methods */
}
