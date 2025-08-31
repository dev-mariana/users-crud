import express from "express";
import { errorHandlerMiddleware } from "~/middleware/error-handler.middleware";
import { usersRouter } from "~/routes/users.routes";
import { authRouter } from "./routes/auth.routes";

export const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", authRouter);

app.use(errorHandlerMiddleware);
