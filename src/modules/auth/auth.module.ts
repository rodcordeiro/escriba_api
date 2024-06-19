import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { NestJwtModule } from '@/core/jwt/jwt.module';

import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { AuthService } from '@/modules/auth/services/auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { RefreshTokenStrategy } from '@/modules/auth/strategies/refreshToken.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    HttpModule,
    PassportModule,
    NestJwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
