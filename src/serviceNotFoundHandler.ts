import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

export default function serviceNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  // catch 404 and forward to error handler
  next(createError(404, "page not found"));
}
