import { Column, Entity, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt';

import { BaseEntity } from '@/common/entities/base.entity';

@Entity('es_tb_user')
export class UsersEntity extends BaseEntity {
  /** Columns */

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

 
  /** Joins */

  /** Methods */
  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }
}
