import serverConfig from "./components/server.config";
import dbConfig from "./components/database.config";
import paymentConfig from "./components/payment.config";

const config = { ...dbConfig, ...serverConfig, ...paymentConfig };
export default config;
