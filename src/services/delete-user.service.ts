import { ErrorHandler } from "~/errors/error-handler";
import type { UsersRepository } from "~/repositories/users.repository";

export class DeleteUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ErrorHandler(404, "User not found.");
    }

    await this.usersRepository.delete(id);
  }
}
