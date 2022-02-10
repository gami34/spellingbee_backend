"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = __importDefault(require("./components/server.config"));
const database_config_1 = __importDefault(require("./components/database.config"));
const payment_config_1 = __importDefault(require("./components/payment.config"));
const config = Object.assign(Object.assign(Object.assign({}, database_config_1.default), server_config_1.default), payment_config_1.default);
exports.default = config;
