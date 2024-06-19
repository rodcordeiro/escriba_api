import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    const user = this._authService.validate(username, password);
    if (!user) {
      return new UnauthorizedException('username or password invalid');
    }
    return user;
  }
}
