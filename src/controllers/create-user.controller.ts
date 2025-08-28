import type { Request, Response } from "express";
import { UsersRepository } from "~/repositories/users.repository";
import { CreateUserService } from "~/services/create-user.service";

export async function createUserController(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        error:
          "Missing required fields: name, email, and password are required",
      });
    }

    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const createUserDto = { name, email, password };
    const user = await createUserService.execute(createUserDto);

    return response.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
