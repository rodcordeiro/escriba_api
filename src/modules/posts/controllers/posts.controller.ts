import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/common/decorators/auth.decorator';

import { PostsService } from '@/modules/posts/services/posts.service';
import { CreatePostDTO } from '@/modules/posts/dto/create.dto';
import { UpdatePostDTO } from '@/modules/posts/dto/update.dto';

@Auth()
@ApiTags('Posts')
@Controller({
  version: '1',
  path: '/posts',
})
export class PostsControllers {
  constructor(private readonly postsServices: PostsService) {}

  @Get()
  async index(@Req() req: EscribaRequest) {
    return await this.postsServices.list(req.user.id);
  }
  @Get('/:id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postsServices.findOneBy({ id });
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: EscribaRequest, @Body() body: CreatePostDTO) {
    return this.postsServices.store({ ...body, owner: req.user.id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePostDTO,
  ) {
    return this.postsServices.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postsServices.delete(id);
  }
}
