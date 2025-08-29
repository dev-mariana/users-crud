import type { Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { UpdateUserService } from "~/services/update-user.service";

export async function updateUserController(
  request: Request,
  response: Response
): Promise<Response> {
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

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
