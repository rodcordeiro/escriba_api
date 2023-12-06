import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersControllers } from '@/modules/users/controllers/users.controller';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { UsersService } from '@/modules/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersControllers],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
