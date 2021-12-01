class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    if (process.env.NODE_ENV.trim() === 'production')
      this.prodMessage = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = AppError;
