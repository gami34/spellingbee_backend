import express, { Application } from "express";
import * as controller from "./auth.controller";
import authHooks from "./auth.hooks";

const authRouter = express.Router();

export default function authService(app: Application) {
  authRouter.post("/signup", authHooks(), controller.signup(app));
  authRouter.post("/signin", authHooks(), controller.signup(app));
  authRouter.post("/signout", authHooks(), controller.signup(app));
  authRouter.post("/signoff", authHooks(), controller.signup(app));
  authRouter.post("/forgetpassword", authHooks(), controller.signup(app));
  authRouter.post("/verifypin", authHooks(), controller.signup(app));
  authRouter.post("/securitydetails", authHooks(), controller.signup(app));
  authRouter.post("/createpassword", authHooks(), controller.signup(app));

  app.use("/auth", authRouter);
}
