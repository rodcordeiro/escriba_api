import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/common/decorators/auth.decorator';

import { PostsService } from '../services/posts.service';
import { CreatePostDTO } from '../dto/create.dto';

@Auth()
@ApiTags('Accounts')
@Controller({
  version: '1',
  path: '/accounts',
})
export class PostsController {
  constructor(private readonly _service: PostsService) {}

  @Get()
  async index() {
    return await this._service.findAll();
  }

  @Get('/:id')
  async view(@Param('id') id: string) {
    return this._service.findOneBy({ id });
  }

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() data: CreatePostDTO,
  ) {
    return this._service.store({ ...data, owner: req.user.id });
  }

  @Put('/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() data: Partial<CreatePostDTO>,
  ) {
    return this._service.update(id, { ...data, owner: req.user.id });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this._service.destroy(id);
  }
}
