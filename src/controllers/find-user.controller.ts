import type { Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { FindUserService } from "~/services/find-user.service";

export async function findUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const findUserBodyParam = z.object({
    id: z.string(),
  });

  const { id } = findUserBodyParam.parse(request.params);

  try {
    const usersRepository = new UsersRepository();
    const findUserService = new FindUserService(usersRepository);

    const user = await findUserService.execute(id);

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
