import { DbUser } from '../user';

export type DbRole = {
  id: number,
  name: string,
  users: DbUser[];
};