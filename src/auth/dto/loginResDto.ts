import {ApiProperty} from "@nestjs/swagger";

export class LoginResDto {
  @ApiProperty({required: true})
  accessToken: string;

  //refreshToken: string;
}