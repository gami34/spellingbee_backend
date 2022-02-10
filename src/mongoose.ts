import mongoose, { ConnectOptions } from "mongoose";
import { Express } from "express";
import logger from "./logger";
import config from "./config";

export default function mongooseClient(app: Express) {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(config.databaseConfig.DB_CLOUD_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      logger.info("database connection establised");
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
}
