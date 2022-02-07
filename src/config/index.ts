import serverConfig from "./components/server.config";
import dbConfig from "./components/database.config";

const config = { ...dbConfig, ...serverConfig };
export default config;
