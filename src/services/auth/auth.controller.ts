import { Application, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { ErrorInterface, UserInterface } from "../../interfaces";

export const signup = (app: Application) => {
  return async (req: Request, res: Response) => {
    const User = app.get("User");
    try {
      const newUser: HydratedDocument<UserInterface> = new User({
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      const errorMes = newUser.validateSync();
      if (errorMes) {
        throw new Error(JSON.stringify(errorMes.errors));
      }
      res.json({ success: true, messae: true });
    } catch (error) {
      const err = error as ErrorInterface;
      const splitMes: string[] = err.message.split("");
      const index = splitMes.indexOf(":");
      splitMes.splice(0, index + 1);
      const commaSeperatedMes = splitMes.join("").split(",");
      res.json({ success: false, message: commaSeperatedMes });
    }
  };
};
