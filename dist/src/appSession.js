"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
function appSession(app) {
    var _a;
    app.use((0, express_session_1.default)({
        secret: [(_a = config_1.default.server) === null || _a === void 0 ? void 0 : _a.secret],
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    }));
    logger_1.default.info("App session now initialized");
}
exports.default = appSession;
