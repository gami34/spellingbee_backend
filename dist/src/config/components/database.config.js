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
    DB_CLOUD_URL: joi_1.default.string(),
    MODEL_USERNAME_FIELD: joi_1.default.string(),
    MODEL_PASSWORD_FIELD: joi_1.default.string(),
})
    .unknown()
    .required();
const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    databaseConfig: {
        DB_CLOUD_URL: envVars.DB_CLOUD_URL,
        MODEL_USERNAME_FIELD: envVars.MODEL_USERNAME_FIELD,
        MODEL_PASSWORD_FIELD: envVars.MODEL_PASSWORD_FIELD,
    },
};
exports.default = config;
