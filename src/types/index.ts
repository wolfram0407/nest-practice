export enum Role
{
  Admin = 'ADMIN',
  User = 'USER',
}

export type TokenPayload = {
  sub: string;
  iat: number;
  jti: string;
};