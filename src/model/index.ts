import { Application } from "express";
import UserModel from "./user.model";
import PaymentModel from "./payment.model";
import SchoolModel from "./school.model";
import StudentModel from "./student.model";
import logger from "../logger";

export default function models(app: Application) {
  UserModel(app);
  SchoolModel(app);
  StudentModel(app);
  PaymentModel(app);
  logger.info("Model service now initialized");
}
