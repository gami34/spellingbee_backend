/* eslint-disable consistent-return */

import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { Application, NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { UserInterface } from "./interfaces";
import config from "./config";
import logger from "./logger";

class AuthenticationService {
  private app: Application;

  private User;

  private jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.server?.secret,
  };

  constructor(app: Application) {
    this.app = app;
    this.User = app.get("User");
  }

  registerJWT() {
    this.app.get("passport").use(
      new passportJWT.Strategy(this.jwtOptions, (jwtPayload, done) => {
        this.User.findOne({ _id: jwtPayload.id }, (err: object, user: HydratedDocument<UserInterface>) => {
          if (err) {
            done(err, false);
          } else if (!user) {
            done(null, false);
          } else {
            return done(null, user);
          }
        });
      }),
    );
  }

  registerLocal() {
    this.app.get("passport").use(
      new passportLocal.Strategy(
        {
          usernameField: config.databaseConfig.MODEL_USERNAME_FIELD,
          passwordField: config.databaseConfig.MODEL_PASSWORD_FIELD,
        },
        (username, password, done) => {
          const query = { username };

          this.User.findOne(query, (err: object, user: HydratedDocument<UserInterface>) => {
            if (err) {
              done(err, false, { message: "Wrong Username. or Password" });
            } else if (!user) {
              done(null, false, { message: "Wrong Username. or Password" });
            } else {
              this.app.get("bcrypt").compare(password, user.password, (err: object, isMatch: boolean) => {
                if (err) {
                  done(err, false, { message: "Wrong Username. or Password" });
                } else if (isMatch) {
                  done(null, user);
                } else {
                  return done(null, false, {
                    message: "Wrong Username or Password",
                  });
                }
              });
            }
          });
        },
      ),
    );
  }

  decoder() {
    this.app.get("passport").serializeUser((user: any, done: any) => {
      done(null, user.id);
    });
    this.app.get("passport").deserializeUser((id: string, done: any) => {
      this.User.findById(id, (err: any, user: HydratedDocument<UserInterface>) => {
        return done(err, user);
      });
    });
    this.app.use(this.app.get("passport").initialize());
    this.app.use(this.app.get("passport").session());
  }

  authenticateLocal() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.app.get("passport").authenticate("local", { session: false })(req, res, next);
    };
  }

  authenticateJWT() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.app.get("passport").authenticate("jwt", { session: false })(req, res, next);
    };
  }
}

export default function authentication(app: Application) {
  const authInstance = new AuthenticationService(app);
  authInstance.registerJWT();
  authInstance.registerLocal();
  authInstance.decoder();
  logger.info("Autentication service now initialized");
  app.set("authInstance", authInstance);
}
