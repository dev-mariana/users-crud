import type { User } from "~/entities/user";

export interface IUsersRepository {
  create(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
}
