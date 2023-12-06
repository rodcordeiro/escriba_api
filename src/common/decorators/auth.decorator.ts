import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { RefreshTokenGuard } from '@/common/guards/refreshToken.guard';
import { LocalGuard } from '@/common/guards/Local.guard';

export function LocalAuth() {
  return applyDecorators(UseGuards(LocalGuard));
}

export function Auth() {
  return applyDecorators(UseGuards(AccessTokenGuard));
}

export function Reauth() {
  return applyDecorators(UseGuards(RefreshTokenGuard));
}
