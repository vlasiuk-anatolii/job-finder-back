import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';
import { IUser } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: IUser, response: Response) {
    const expires = new Date();
    const expiresIn: StringValue =
      this.configService.getOrThrow('JWT_EXPIRATION');
    expires.setMilliseconds(expires.getMilliseconds() + ms(expiresIn));

    const tokenPayload: TokenPayload = {
      userId: String(user.id),
    };

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      const authenticated = await bcrypt.compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  verifyToken(jwt: string) {
    this.jwtService.verify(jwt);
  }
}
