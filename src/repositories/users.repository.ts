import { UserModel } from "~/config/database/mongo/schema/users";
import type { User } from "~/entities/user";
import type { IUsersRepository } from "./users.interface";

export class UsersRepository implements IUsersRepository {
  async create(user: Partial<User>): Promise<User> {
    const created_user = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at ?? null,
    });

    return created_user;
  }

  async findAll(): Promise<User[]> {
    return await UserModel.find();
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    if (!user) return null;

    return user;
  }
}
