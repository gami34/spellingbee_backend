import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
  .object({
    DB_CLOUD_URL: joi.string(),
    MODEL_USERNAME_FIELD: joi.string(),
    MODEL_PASSWORD_FIELD: joi.string(),
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

export default config;
