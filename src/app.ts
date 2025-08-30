import express from "express";
import { errorHandlerMiddleware } from "~/middleware/error-handler.middleware";
import { usersRouter } from "~/routes/users.routes";

export const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);

app.use(errorHandlerMiddleware);
