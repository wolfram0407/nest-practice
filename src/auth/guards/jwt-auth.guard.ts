import {ExecutionContext, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "@nestjs/passport";
import {Observable} from "rxjs";
import {IS_PUBLIC_KEY} from "src/common/docorator/public.decorator";
import {UsersService} from "src/users/users.service";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super(

    );
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true;
    }


    return super.canActivate(context)
  }
}