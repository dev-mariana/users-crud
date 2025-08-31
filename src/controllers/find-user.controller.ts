import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { FindUserService } from "~/services/find-user.service";

export async function findUserController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const findUserBodyParam = z.object({
      id: z.string(),
    });

    const { id } = findUserBodyParam.parse(request.params);

    const usersRepository = new UsersRepository();
    const findUserService = new FindUserService(usersRepository);

    const user = await findUserService.execute(id);

    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
