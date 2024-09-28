import {ApiProperty, PickType} from "@nestjs/swagger";
import {SignupResDto} from "./SignupResDto";

export class LogoutResDto extends PickType(SignupResDto, ['_id']) {
  @ApiProperty({required: true})
  _id: string;
};