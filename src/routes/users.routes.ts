import { Router } from "express";
import { createUserController } from "~/controllers/create-user.controller";
import { deleteUserController } from "~/controllers/delete-user.controller";
import { fetchUsersController } from "~/controllers/fetch-users.controller";
import { findUserController } from "~/controllers/find-user.controller";
import { updateUserController } from "~/controllers/update-user.controller";

const usersRouter = Router();

usersRouter.post("/", createUserController);
usersRouter.get("/", fetchUsersController);
usersRouter.get("/:id", findUserController);
usersRouter.patch("/:id", updateUserController);
usersRouter.delete("/:id", deleteUserController);

export { usersRouter };
