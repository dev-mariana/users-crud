import bcrypt from "bcrypt";
import type {
  CreateUserRequest,
  CreateUserResponse,
} from "~/dtos/create-user.dto";
import type { UsersRepository } from "~/repositories/users.repository";

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 6);

    const user = await this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: encryptedPassword,
    });

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
