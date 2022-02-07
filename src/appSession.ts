import { Application } from "express";
import session from "express-session";
import config from "./config";
import logger from "./logger";

export default function appSession(app: Application) {
  app.use(
    session({
      secret: [config.server?.secret],
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    }),
  );
  logger.info("App session now initialized");
}
