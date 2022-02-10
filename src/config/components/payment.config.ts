import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
  .object({
    FLUTTERWAVE_SECRET_KEY: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  flutterwave: {
    FLUTTERWAVE_SECRET_KEY: envVars.FLUTTERWAVE_SECRET_KEY,
  },
};

export default config;
