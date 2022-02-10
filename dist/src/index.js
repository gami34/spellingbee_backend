"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const logger_1 = __importDefault(require("./logger"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const socketio_1 = __importDefault(require("./socketio"));
const serverDebugger = (0, debug_1.default)("gideon:server");
const port = normalizePort(config_1.default.server.port || "3000");
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
(0, socketio_1.default)(server, app_1.default);
process.on("unhandledRejection", (reason, p) => logger_1.default.error("Unhandled Rejection at: Promise ", p, reason));
server.listen(port, () => {
    if (config_1.default.isDevelopment)
        logger_1.default.info(`server port: ${port}`);
});
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case "EACCES":
            logger_1.default.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger_1.default.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case "ELIFECYCLE":
            logger_1.default.error(`${bind}this happened instaed`);
            process.exit(1);
            break;
        default:
            logger_1.default.info("this happend instaed");
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    serverDebugger(`Listening on ${bind}`);
}
