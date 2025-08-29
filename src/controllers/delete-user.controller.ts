import type { Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { DeleteUserService } from "~/services/delete-user.service";

export async function deleteUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const deleteUserBodyParam = z.object({
    id: z.string(),
  });

  const { id } = deleteUserBodyParam.parse(request.params);

  try {
    const usersRepository = new UsersRepository();
    const deleteUserService = new DeleteUserService(usersRepository);

    const user = await deleteUserService.execute(id);

    return response.status(204).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
