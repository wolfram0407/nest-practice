import {Body, Controller, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersService} from 'src/users/users.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiTags} from '@nestjs/swagger';

import {SignupResDto} from './dto/SignupResDto';
import {Role} from 'src/types';
import {Public} from 'src/common/docorator/public.decorator';
import {LoginReqDto} from './dto/LoginReqDto';

import {UserAfterAuth, User} from 'src/common/docorator/user.decorator';
import {LogoutResDto} from './dto/logoutResDto';
import {LoginResDto} from './dto/loginResDto';
import {ApiPostResponse} from 'src/common/docorator/swagger.decorator';
import {createUserReqDto} from 'src/users/dto/createUser.req.dto';



@ApiTags('Auth')
@ApiExtraModels(LoginResDto, SignupResDto, LogoutResDto)
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @ApiPostResponse(SignupResDto)
  @ApiOperation({summary: '회원가입', description: '이용자를 추가합니다.'})
  @ApiCreatedResponse({description: '유저를 생성한다', type: SignupResDto})
  @Post('signup')
  async signup(@Body() createUserDto: createUserReqDto): Promise<SignupResDto> {
    const user = await this.userService.createUser(createUserDto);

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: user.roles as Role, // Enum으로 반환 확인
    };
  }

  @ApiPostResponse(LoginResDto)
  @Public()
  @Post('login')
  async login(
    @Body() loginReqDto: LoginReqDto,
  ): Promise<LoginResDto> {

    return this.authService.login(
      loginReqDto.email,
      loginReqDto.password,
    )
  }
  @ApiPostResponse(LogoutResDto)
  @ApiOperation({summary: '로그아웃', description: `로그아웃을 진행합니다.`})
  @ApiBearerAuth()
  @Post('logout')
  async logout(
    @User() user: UserAfterAuth
  ): Promise<LogoutResDto> {
    console.log('logout')
    console.log(user);
    /*
      추후에 로그아웃 요청 시 토큰관리 하면 작업 필요
    */
    return {_id: user._id};
  }
}

