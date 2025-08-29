import type { Request, Response } from "express";
import z from "zod";
import { UsersRepository } from "~/repositories/users.repository";
import { CreateUserService } from "~/services/create-user.service";

export async function createUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
