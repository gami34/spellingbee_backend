"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const school_model_1 = __importDefault(require("./school.model"));
const student_model_1 = __importDefault(require("./student.model"));
const logger_1 = __importDefault(require("../logger"));
function models(app) {
    (0, user_model_1.default)(app);
    (0, school_model_1.default)(app);
    (0, student_model_1.default)(app);
    (0, payment_model_1.default)(app);
    logger_1.default.info("Model service now initialized");
}
exports.default = models;
