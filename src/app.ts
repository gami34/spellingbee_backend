import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import errorHandler from "./errorHandler";
import serviceNotFoundHandler from "./serviceNotFoundHandler";
import mongooseClient from "./mongoose";
import authentication from "./authentication";
import appSession from "./appSession";
import services from "./services";
import RABC from "./RABC";
import models from "./model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.set("passport", passport);
app.set("bcrypt", bcrypt);

appSession(app);
RABC(app);
mongooseClient(app);
models(app);
authentication(app);
services(app);

app.use(serviceNotFoundHandler);
app.use(errorHandler);

export default app;
