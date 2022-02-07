import { NextFunction, Request, Response } from "express";

export default function authHooks() {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}
