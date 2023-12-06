import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersEntity } from '@/modules/users/entities/users.entity';
import { UpdateUserDTO } from '@/modules/users/dto/update.dto';
import { CreateUserDTO } from '../dto/create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });
  }

  async findBy(options: FindOneOptions<UsersEntity>['where']) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        select: ['id', 'username', 'createdAt', 'updatedAt'],
        where: {
          ...options,
        },
      });
      return user;
    } catch (err) {
      console.error(err);
      throw new NotFoundException('User not found');
    }
  }
  async validate(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: options,
      });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }
  async store(data: CreateUserDTO) {
    const alreadyRegistered = await this.usersRepository.findOneBy({
      username: data.username,
    });
    if (alreadyRegistered)
      throw new BadRequestException(`Username ${data.username} already in use`);
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }
  async update(id: string, data: UpdateUserDTO) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }
  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    await this.usersRepository.delete({ id });
  }
  async updateToken(id: string, refreshToken: string) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, { refreshToken });
    await this.usersRepository.save(user);
  }
}
