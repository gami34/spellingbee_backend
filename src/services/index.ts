import { Application } from "express";
import authService from "./auth/auth.service";
import registrationService from "./registration/registration.service";

export default function services(app: Application) {
  authService(app);
  registrationService(app);
}
