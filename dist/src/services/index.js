"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth/auth.service"));
const registration_service_1 = __importDefault(require("./registration/registration.service"));
function services(app) {
    (0, auth_service_1.default)(app);
    (0, registration_service_1.default)(app);
}
exports.default = services;
