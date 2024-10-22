import {ApiProperty} from "@nestjs/swagger";
import {Role} from "src/types";

export class SignupResDto {

  @ApiProperty({required: true})
  name: string;
  @ApiProperty({required: true})
  email: string;
  @ApiProperty({required: true})
  phone: string;
  @ApiProperty({required: true, enum: Role})
  roles: Role;
};