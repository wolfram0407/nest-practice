import {PickType} from "@nestjs/swagger";
import {createUserReqDto} from "./createUserReqDto";


export class LoginReqDto extends PickType(createUserReqDto, ['email', 'password'] as const) {
  email: string;
  password: string;
};