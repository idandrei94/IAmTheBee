import { DbUser } from '../user';

export type DbRole = {
  id: number,
  name: string,
  users: DbUser[];
};

export type TokenPayload = {
  userId: string;
  roles: string[];
  expiresAt: Date;
};