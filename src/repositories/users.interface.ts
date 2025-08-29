import type { User } from "~/entities/user";

export interface IUsersRepository {
  create(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
