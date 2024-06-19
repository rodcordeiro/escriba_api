import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Jwt } from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { EncryptUtils } from '@/common/utils/encrypt.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: process.env.JWT_SECRET,
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
