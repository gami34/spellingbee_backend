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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const signup = (app) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const User = app.get("User");
        try {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
            });
            yield newUser.save();
            const errorMes = newUser.validateSync();
            if (errorMes) {
                throw new Error(JSON.stringify(errorMes.errors));
            }
            res.json({ success: true, messae: true });
        }
        catch (error) {
            const err = error;
            const splitMes = err.message.split("");
            const index = splitMes.indexOf(":");
            splitMes.splice(0, index + 1);
            const commaSeperatedMes = splitMes.join("").split(",");
            res.json({ success: false, message: commaSeperatedMes });
        }
    });
};
exports.signup = signup;
