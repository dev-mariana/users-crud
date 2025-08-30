import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { UpdateUserService } from "~/services/update-user.service";

export async function updateUserController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const updateUserBodyParam = z.object({
    id: z.string(),
  });

  const updateUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { id } = updateUserBodyParam.parse(request.params);
  const { name, email, password } = updateUserBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const updateUserService = new UpdateUserService(usersRepository);

    const user = await updateUserService.execute(id, { name, email, password });

    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
