import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import { UUID } from "crypto";
import {Role} from "src/types";

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;

})

export interface UserAfterAuth {
  _id: UUID,
  email: string,
  name: string,
  phone: string,
  roles: Role,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
}