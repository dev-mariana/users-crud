import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { UpdateUserService } from "~/services/update-user.service";

export async function updateUserController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updateUserBodyParam = z.object({
      id: z.string(),
    });

    const updateUserBodySchema = z
      .object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
      })
      .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        "At least one field must be provided for update"
      );

    const { id } = updateUserBodyParam.parse(request.params);
    const updateData = updateUserBodySchema.parse(request.body);

    const usersRepository = new UsersRepository();
    const updateUserService = new UpdateUserService(usersRepository);

    const user = await updateUserService.execute(id, updateData);

    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
