import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { AuthService } from "~/services/auth.service";

export async function authController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const loginBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = loginBodySchema.parse(request.body);

    const usersRepository = new UsersRepository();
    const authService = new AuthService(usersRepository);

    const user = await authService.login({ email, password });

    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
