import { Application } from "express";
import UserModel from "./user.model";
import logger from "../logger";

export default function models(app: Application) {
  UserModel(app);
  logger.info("Model service now initialized");
}
