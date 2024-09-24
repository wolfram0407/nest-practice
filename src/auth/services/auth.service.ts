import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { TokenPayload } from 'src/types';
import { User } from 'src/users/schemas/user.entity';
import { UsersService } from 'src/users/users.service';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ){}

  async login(
    email: string,
    password: string,
  ){
    const user = await this.validateUser(email, password);
    const payload: TokenPayload = this.createTokenPayload(user._id);
    const accessToken = await this.createAccessToken(user, payload)
 
    return {
      accessToken,
    }
  }


  private async validateUser(
    email: string,
    plainPassword: string,
  ){
    const user = await this.userService.findByEmail(email);
    if (user && (await argon2.verify(user.password, plainPassword))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  createTokenPayload(userId: string): TokenPayload {
    return {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: uuidv4(),
    };
  }


  async createAccessToken(user: User, payload: TokenPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    const payloads = {...payload, tokeType: 'access'}
    return this.jwtService.sign(payloads, {expiresIn});
  }









}
