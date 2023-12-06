import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersService } from '@/modules/users/services/users.service';

import { PostsEntity } from '../entities/post.entity';
import { CreatePostDTO } from '../dto/create.dto';
import { UpdatePostDTO } from '../dto/update.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async list(owner: string) {
    return this.postsRepository.find({
      where: {
        owner: { id: owner },
      },
    });
  }

  async findOneBy(options: FindOneOptions<PostsEntity>['where']) {
    return this.postsRepository
      .findOneByOrFail(options)
      .then(value => value)
      .catch(() => {
        throw new NotFoundException('Post not found');
      });
  }

  async store(data: CreatePostDTO) {
    const owner = await this.usersService.findBy({
      id: data.owner,
    });

    const post = this.postsRepository.create({
      ...data,
      owner,
    });
    return await this.postsRepository.save(post);
  }

  async update(id: string, data: UpdatePostDTO) {
    const post = await this.findOneBy({ id });
    this.postsRepository.merge(post, { ...data });
    return await this.postsRepository.save(post);
  }

  async delete(id: string) {
    await this.findOneBy({ id });
    await this.postsRepository.delete({ id });
  }
}
