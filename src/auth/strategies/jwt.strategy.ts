import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ignoreElements } from "rxjs";
import { TokenPayload } from "src/types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private configService : ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements : false,
      secretOrKey : configService.get<string>("JWT_SECRET")
    })
  }

  async validate(payload : TokenPayload) {
    console.log(payload);
    const {sub} = payload;

    return payload;
  }
}