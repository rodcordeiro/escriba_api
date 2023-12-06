// import { EncryptUtils } from '@/common/utils/encrypt.util';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Jwt } from 'jsonwebtoken';
import { EncryptUtils } from '@/common/utils/encrypt.util';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreException: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: Jwt) {
    const data = EncryptUtils.decrypt(
      payload.payload as string,
      process.env.ENC_SECRET,
    );
    return { id: data.id, username: data.username };
  }
}
