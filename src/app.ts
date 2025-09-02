import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "~/config/swagger/swagger";
import { errorHandlerMiddleware } from "~/middleware/error-handler.middleware";
import { authRouter } from "~/routes/auth.routes";
import { usersRouter } from "~/routes/users.routes";

export const app = express();

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", usersRouter);
app.use("/api/login", authRouter);

app.use(errorHandlerMiddleware);
