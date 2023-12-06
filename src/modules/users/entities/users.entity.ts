import { Column, Entity, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt';

import { BaseEntity } from '@/common/entities/base.entity';


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
  
  /** Methods */
  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }
}
