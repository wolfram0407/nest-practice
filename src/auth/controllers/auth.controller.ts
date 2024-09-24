import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserReqDto } from '../dto/createUserReqDto';
import { SignupResDto } from '../dto/SignupResDto';
import { Role } from 'src/types';
import { Public } from 'src/common/public.decorator';
import { LoginReqDto } from '../dto/LoginReqDto';
import { LoginResDto } from '../dto/LoginResDto';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }
  @Public()
  @ApiOperation({ summary: '회원가입', description: '이용자를 추가합니다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다', type: SignupResDto })
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

  @Public()
  @Post('login')
  async login(
    @Req() req: Request,
    @Body() loginReqDto : LoginReqDto,
   ) {

    return this.authService.login(
      loginReqDto.email,
      loginReqDto.password,
    )
  }
}