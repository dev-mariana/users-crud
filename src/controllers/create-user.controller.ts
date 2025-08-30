import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { CreateUserService } from "~/services/create-user.service";

export async function createUserController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBodySchema.parse(request.body);

    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });

    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
