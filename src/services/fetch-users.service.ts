import type { FetchUsersResponse } from "~/dtos/fetch-users.dto";
import type { UsersRepository } from "~/repositories/users.repository";

export class FetchUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<FetchUsersResponse[]> {
    const users = await this.usersRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at ?? new Date(),
    }));
  }
}
