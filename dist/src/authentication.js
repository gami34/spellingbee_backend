"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = __importDefault(require("passport-local"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
class AuthenticationService {
    constructor(app) {
        var _a;
        this.jwtOptions = {
            jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: (_a = config_1.default.server) === null || _a === void 0 ? void 0 : _a.secret,
        };
        this.app = app;
        this.User = app.get("User");
    }
    registerJWT() {
        this.app.get("passport").use(new passport_jwt_1.default.Strategy(this.jwtOptions, (jwtPayload, done) => {
            this.User.findOne({ _id: jwtPayload.id }, (err, user) => {
                if (err) {
                    done(err, false);
                }
                else if (!user) {
                    done(null, false);
                }
                else {
                    return done(null, user);
                }
            });
        }));
    }
    registerLocal() {
        this.app.get("passport").use(new passport_local_1.default.Strategy({
            usernameField: config_1.default.databaseConfig.MODEL_USERNAME_FIELD,
            passwordField: config_1.default.databaseConfig.MODEL_PASSWORD_FIELD,
        }, (username, password, done) => {
            const query = { username };
            this.User.findOne(query, (err, user) => {
                if (err) {
                    done(err, false, { message: "Wrong Username. or Password" });
                }
                else if (!user) {
                    done(null, false, { message: "Wrong Username. or Password" });
                }
                else {
                    this.app.get("bcrypt").compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            done(err, false, { message: "Wrong Username. or Password" });
                        }
                        else if (isMatch) {
                            done(null, user);
                        }
                        else {
                            return done(null, false, {
                                message: "Wrong Username or Password",
                            });
                        }
                    });
                }
            });
        }));
    }
    decoder() {
        this.app.get("passport").serializeUser((user, done) => {
            done(null, user.id);
        });
        this.app.get("passport").deserializeUser((id, done) => {
            this.User.findById(id, (err, user) => {
                return done(err, user);
            });
        });
        this.app.use(this.app.get("passport").initialize());
        this.app.use(this.app.get("passport").session());
    }
    authenticateLocal() {
        return (req, res, next) => {
            this.app.get("passport").authenticate("local", { session: false })(req, res, next);
        };
    }
    authenticateJWT() {
        return (req, res, next) => {
            this.app.get("passport").authenticate("jwt", { session: false })(req, res, next);
        };
    }
}
function authentication(app) {
    const authInstance = new AuthenticationService(app);
    authInstance.registerJWT();
    authInstance.registerLocal();
    authInstance.decoder();
    logger_1.default.info("Autentication service now initialized");
    app.set("authInstance", authInstance);
}
exports.default = authentication;
