import bcrypt from "bcrypt";
import type {
  UpdateUserRequest,
  UpdateUserResponse,
} from "~/dtos/update-user.dto";
import { ErrorHandler } from "~/errors/error-handler";
import type { UsersRepository } from "~/repositories/users.repository";

export class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    id: string,
    updateUserDto: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ErrorHandler(404, "User not found.");
    }

    const encryptedPassword = await bcrypt.hash(updateUserDto.password, 6);

    const updated_user = await this.usersRepository.update(id, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: encryptedPassword,
    });

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
