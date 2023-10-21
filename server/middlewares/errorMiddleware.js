export class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  error.message = error.message || "Internal server error";
  error.status = error.status || 500;

  res.status(error.status).json({
    success: false,
    message: error.message,
  });
};
