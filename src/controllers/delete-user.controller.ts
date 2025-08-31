import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { DeleteUserService } from "~/services/delete-user.service";

export async function deleteUserController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deleteUserBodyParam = z.object({
      id: z.string(),
    });

    const { id } = deleteUserBodyParam.parse(request.params);

    const usersRepository = new UsersRepository();
    const deleteUserService = new DeleteUserService(usersRepository);

    await deleteUserService.execute(id);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
}
