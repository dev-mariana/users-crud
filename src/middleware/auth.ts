import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "~/config/env";

const SECRET_KEY = env.JWT_SECRET;

export interface JwtRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (
  request: JwtRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return response.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    request.user = decoded;

    next();
  } catch (error) {
    next(error);
    response.status(401).json({ message: "Invalid or expired token" });
  }
};
