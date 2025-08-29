import type {
  UpdateUserRequest,
  UpdateUserResponse,
} from "~/dtos/update-user.dto";
import type { UsersRepository } from "~/repositories/users.repository";

export class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    id: string,
    dto: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.update(id, dto);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at ?? new Date(),
    };
  }
}
