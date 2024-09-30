import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import {Role} from "src/types";

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;

})

export interface UserAfterAuth {
  _id: string,
  email: string,
  name: string,
  phone: string,
  roles: Role,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
}