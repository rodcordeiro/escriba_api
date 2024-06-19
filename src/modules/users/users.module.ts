import { Module } from '@nestjs/common';

import { UsersControllers } from '@/modules/users/controllers/users.controller';
import { UsersService } from '@/modules/users/services/users.service';
import { usersProviders } from './providers/user.provider';

@Module({
  imports: [],
  controllers: [UsersControllers],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
