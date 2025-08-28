import mongoose from "mongoose";
import { env } from "~/config/env";

export async function connection() {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB.", error);
  }
}
