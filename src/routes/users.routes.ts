import { Router } from "express";
import { createUserController } from "~/controllers/create-user.controller";
import { fetchUsersController } from "~/controllers/fetch-users.controller";

const usersRouter = Router();

usersRouter.post("/", createUserController);
usersRouter.get("/", fetchUsersController);

export { usersRouter };
