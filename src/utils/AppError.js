export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith(4) ? "fatal" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
