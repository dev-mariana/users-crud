import { UserModel } from "~/config/database/mongo/schema/users";
import type { User } from "~/entities/user";
import type { IUsersRepository } from "./users.interface";

export class UsersRepository implements IUsersRepository {
  async create(user: Partial<User>): Promise<User> {
    const created_user = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
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

  async update(id: string, user: Partial<User>): Promise<User> {
    const updated_user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: Date.now(),
      },
      {
        new: true,
      }
    );

    if (!updated_user) {
      throw new Error("Failed to update user.");
    }

    return updated_user;
  }
}
