"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("./config"));
function mongooseClient(app) {
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default
        .connect(config_1.default.databaseConfig.DB_CLOUD_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        logger_1.default.info("database connection establised");
    })
        .catch((err) => {
        logger_1.default.error(err);
        process.exit(1);
    });
    app.set("mongooseClient", mongoose_1.default);
}
exports.default = mongooseClient;
