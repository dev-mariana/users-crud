import type { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "~/errors/error-handler";

export function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  console.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  });

  if (error instanceof ErrorHandler) {
    return response.status(error.statusCode).json({
      error: error.message,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "ZodError") {
    return response.status(400).json({
      error: "Validation error",
      details: error.message,
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "MongoError" && (error as any).code === 11000) {
    return response.status(409).json({
      error: "Duplicate key error",
      message: "A record with this information already exists",
      statusCode: 409,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "CastError") {
    return response.status(400).json({
      error: "Invalid Id format",
      message: "The provided Id is not in the correct format",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: "Validation error",
      message: "Data validation failed",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Invalid token",
      message: "The provided authentication token is invalid",
      statusCode: 401,
      timestamp: new Date().toISOString(),
    });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "Token expired",
      message: "The authentication token has expired",
      statusCode: 401,
      timestamp: new Date().toISOString(),
    });
  }

  return response.status(500).json({
    error: "Internal server error",
    message: "An unexpected error occurred",
    statusCode: 500,
    timestamp: new Date().toISOString(),
  });
}
