"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const verifyTransaction = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config_1.default.flutterwave.FLUTTERWAVE_SECRET_KEY}`,
        },
    });
    return data;
});
exports.verifyTransaction = verifyTransaction;
