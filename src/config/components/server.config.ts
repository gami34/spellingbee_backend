import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
  .object({
    NODE_ENV: joi.string().allow("development", "production", "test"),
    PORT: joi.string(),
    API_VERSION: joi.string(),
    SECRET: joi.string(),
    TOKEN_EXPIRATION_TIME: joi.string(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
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

export default config;
