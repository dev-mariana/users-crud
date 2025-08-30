import type { NextFunction, Request, Response } from "express";
import { UsersRepository } from "~/repositories/users.repository";
import { FetchUsersService } from "~/services/fetch-users.service";

export async function fetchUsersController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usersRepository = new UsersRepository();
    const fetchUsersService = new FetchUsersService(usersRepository);

    const users = await fetchUsersService.execute();

    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
