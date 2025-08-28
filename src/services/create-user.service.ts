import type {
  CreateUserRequest,
  CreateUserResponse,
} from "~/dtos/create-user.dto";
import type { UsersRepository } from "~/repositories/users.repository";

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      created_at: new Date(),
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
    };
  }
}
