"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authHooks() {
    return (req, res, next) => {
        next();
    };
}
exports.default = authHooks;
