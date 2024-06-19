import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/modules/users/services/users.service';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { CreateUserDTO } from '@/modules/users/dto/create.dto';
import { EncryptUtils } from '@/common/utils/encrypt.util';
import DateManipulation from '@/common/utils/date.utils';

interface JwtPayload {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    try {
      const user = await this._usersService.validate({ username });
      const validPassword = compareSync(password, user.password);

      if (!validPassword) return null;

      return user;
    } catch (err) {
      return null;
    }
  }

  async login(user: UsersEntity) {
    const payload = EncryptUtils.encrypt(
      {
        id: user.id,
        username: user.username,
      },
      process.env.ENC_SECRET,
    );
    const tokens = this.getTokens(payload);
    await this._usersService.updateToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      authenticated: true,
    };
  }

  async register(payload: CreateUserDTO) {
    try {
      const user = (await this._usersService.store(payload)) as UsersEntity;
      console.log(user);
      const tokenPayload = EncryptUtils.encrypt(
        {
          id: user.id,
          username: user.username,
        },
        process.env.ENC_SECRET,
      );
      const tokens = this.getTokens(tokenPayload);
      await this._usersService.updateToken(user.id, tokens.refreshToken);
      return {
        ...tokens,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async reAuth(payload: JwtPayload) {
    const tokenPayload = EncryptUtils.encrypt(
      { ...payload },
      process.env.ENC_SECRET,
    );
    const tokens = this.getTokens(tokenPayload);
    await this._usersService.updateToken(payload.id, tokens.refreshToken);
    return {
      ...tokens,
      authenticated: true,
    };
  }

  private getTokens(payload: string) {
    return {
      accessToken: this._jwtService.sign({ payload }),
      expires: DateManipulation.hour(new Date(), 1),
      refreshToken: this._jwtService.sign(
        { payload },
        {
          expiresIn: '5d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      ),
    };
  }
}
