import express, { Application } from "express";
import * as controller from "./registration.controller";
import authHooks from "./registration.hooks";

const authRouter = express.Router();

export default function authService(app: Application) {
  authRouter.post("/", authHooks(), controller.registration());

  app.use("/registration", authRouter);
}
