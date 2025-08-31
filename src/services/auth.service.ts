import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/config/env";
import type { AuthRequest, AuthResponse } from "~/dtos/auth.dto";
import { ErrorHandler } from "~/errors/error-handler";
import type { UsersRepository } from "~/repositories/users.repository";

export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async login(authDto: AuthRequest): Promise<AuthResponse> {
    const user = await this.usersRepository.findByEmail(authDto.email);

    if (!user) {
      throw new ErrorHandler(404, "User not found.");
    }

    await this.isPasswordValid(authDto.password, user.password);

    const isTokenValid = this.isTokenValid(authDto.email);

    return {
      id: user.id,
      name: user.name,
      token: isTokenValid,
    };
  }

  private async isPasswordValid(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid) {
      throw new ErrorHandler(401, "Invalid credentials.");
    }

    return isValid;
  }

  private isTokenValid(email: string): string {
    const isTokenValid = jwt.sign({ email: email }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (!isTokenValid) {
      throw new ErrorHandler(401, "Invalid token.");
    }

    return isTokenValid;
  }
}
