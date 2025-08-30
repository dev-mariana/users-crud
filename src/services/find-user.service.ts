import type { FindUserResponse } from "~/dtos/find-user.dto";
import { ErrorHandler } from "~/errors/error-handler";
import type { UsersRepository } from "~/repositories/users.repository";

export class FindUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<FindUserResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ErrorHandler(404, "User not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at ?? null,
    };
  }
}
