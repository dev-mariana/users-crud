import { Router } from "express";
import { createUserController } from "~/controllers/create-user.controller";
import { deleteUserController } from "~/controllers/delete-user.controller";
import { fetchUsersController } from "~/controllers/fetch-users.controller";
import { findUserController } from "~/controllers/find-user.controller";
import { updateUserController } from "~/controllers/update-user.controller";
import { authMiddleware } from "~/middleware/auth";

const usersRouter = Router();

usersRouter.post("/", authMiddleware, createUserController);
usersRouter.get("/", authMiddleware, fetchUsersController);
usersRouter.get("/:id", authMiddleware, findUserController);
usersRouter.patch("/:id", authMiddleware, updateUserController);
usersRouter.delete("/:id", authMiddleware, deleteUserController);

export { usersRouter };
