import { Request, Response } from "express";
import { ErrorInterface } from "../../interfaces";

export const registration = () => {
  return async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      res.json({ success: true, message: true });
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
