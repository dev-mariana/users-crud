import { app } from "./app";
import { connection } from "./config/database/mongo";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

connection();
