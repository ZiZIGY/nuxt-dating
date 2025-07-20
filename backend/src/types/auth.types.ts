import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    nickname: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
