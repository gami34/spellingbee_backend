"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const envSchema = joi_1.default
    .object({
    NODE_ENV: joi_1.default.string().allow("development", "production", "test"),
    PORT: joi_1.default.string(),
    API_VERSION: joi_1.default.string(),
    SECRET: joi_1.default.string(),
    TOKEN_EXPIRATION_TIME: joi_1.default.string(),
})
    .unknown()
    .required();
const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === "test",
    isDevelopment: envVars.NODE_ENV === "development",
    server: {
        port: envVars.PORT || "3000",
        apiVersion: envVars.API_VERSION || "v1",
        secret: envVars.SECRET,
        tokenExpirationTime: envVars.TOKEN_EXPIRATION_TIME,
    },
};
exports.default = config;
