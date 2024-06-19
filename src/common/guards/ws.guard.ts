import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { EncryptUtils } from '../utils/encrypt.util';
import { ENV_VARIABLES } from '../config/env.config';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(
    private readonly _jwt: JwtService,
    private readonly _reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;
    const client = context.switchToWs().getClient();
    const authorization = client.handshake.headers.authorization;

    if (!authorization)
      throw new UnauthorizedException('Token not found in request');

    try {
      const token = authorization.split(' ')[1];
      const decode = this._jwt.decode(token) as JwtPayload;

      const data = EncryptUtils.decrypt(
        decode.payload,
        ENV_VARIABLES.ENC_SECRET,
      );
      console.log(data);
      context.switchToHttp().getRequest().user = decode;
      return true;
    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException(
          'The session has expired. Please relogin',
        );
      else if (error.name === 'JsonWebTokenError')
        throw new UnauthorizedException('Token malformed');
      else throw new UnauthorizedException(error.message);
    }
  }
}
