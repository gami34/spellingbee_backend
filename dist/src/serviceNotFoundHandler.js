"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
function serviceNotFoundHandler(req, res, next) {
    next((0, http_errors_1.default)(404, "page not found"));
}
exports.default = serviceNotFoundHandler;
