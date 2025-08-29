import { Router } from "express";
import { createUserController } from "~/controllers/create-user.controller";
import { fetchUsersController } from "~/controllers/fetch-users.controller";
import { findUserController } from "~/controllers/find-user.controller";

const usersRouter = Router();

usersRouter.post("/", createUserController);
usersRouter.get("/", fetchUsersController);
usersRouter.get("/:id", findUserController);

export { usersRouter };
