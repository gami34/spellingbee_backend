/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, statusCode: err.status, success: false });
};

export default errorHandler;
