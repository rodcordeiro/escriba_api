import { Column, Entity, BeforeInsert, OneToMany, JoinColumn } from 'typeorm';
import { hashSync } from 'bcrypt';

import { BaseEntity } from '@/common/entities/base.entity';
import { PostsEntity } from '@/modules/posts/entities/post.entity';

@Entity({ name: 'escriba_tb_users' })
export class UsersEntity extends BaseEntity {
  /** Columns */
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  /** Joins */
  @OneToMany(() => PostsEntity, post => post.owner)
  @JoinColumn()
  posts?: PostsEntity[];

  /** Methods */
  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }
}
