"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message, statusCode: err.status, success: false });
};
exports.default = errorHandler;
