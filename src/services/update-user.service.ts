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
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    const updated_user = await this.usersRepository.update(id, dto);

    return {
      id: updated_user.id,
      name: updated_user.name,
      email: updated_user.email,
      password: updated_user.password,
      created_at: updated_user.created_at,
      updated_at: updated_user.updated_at ?? new Date(),
    };
  }
}
