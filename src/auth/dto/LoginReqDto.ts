import {PickType} from "@nestjs/swagger";
import {createUserReqDto} from "src/users/dto/createUser.req.dto";



export class LoginReqDto extends PickType(createUserReqDto, ['email', 'password'] as const) {
  email: string;
  password: string;
};