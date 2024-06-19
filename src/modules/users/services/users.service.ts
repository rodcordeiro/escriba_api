import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';

import { UsersEntity } from '@/modules/users/entities/users.entity';

@Injectable()
export class UsersService extends BaseService {
  override repository = this._repository;
  constructor(
    @Inject('USER_REPOSITORY')
    private _repository: Repository<UsersEntity>,
  ) {
    super();
  }

  async validate(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this._repository.findOneOrFail({
        select: ['password', 'username', 'id'],
        where: options,
      });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async updateToken(id: string, refreshToken: string) {
    const user = await this.findOneBy({ id });
    console.log(user,refreshToken)
    // this._repository.merge(user, { refreshToken });
    // await this._repository.save(user);
  }
}
