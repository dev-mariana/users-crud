import type { Request, Response } from "express";
import { UsersRepository } from "~/repositories/users.repository";
import { FetchUsersService } from "~/services/fetch-users.service";

export async function fetchUsersController(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const usersRepository = new UsersRepository();
    const createUserService = new FetchUsersService(usersRepository);

    const user = await createUserService.execute();

    return response.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
