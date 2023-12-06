import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/common/decorators/auth.decorator';

import { UsersService } from '@/modules/users/services/users.service';

@Auth()
@ApiTags('Users')
@Controller({
  version: '1',
  path: '/users',
})
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index() {
    return await this.usersService.findAll();
  }
  @Get('/me')
  async view(@Req() req: EscribaRequest) {
    return this.usersService.findBy({ id: req.user.id });
  }
}
