import type { Request, Response } from "express";
import { UsersRepository } from "~/repositories/users.repository";
import { FetchUsersService } from "~/services/fetch-users.service";

export async function fetchUsersController(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const usersRepository = new UsersRepository();
    const fetchUsersService = new FetchUsersService(usersRepository);

    const user = await fetchUsersService.execute();

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}
