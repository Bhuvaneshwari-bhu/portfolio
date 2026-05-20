/**
 * Central Express error handler.
 * Must be registered AFTER all routes (4 parameters).
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  let statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {}).join(', ');
    message = `Duplicate value for field: ${field}`;
  }

  const isDev = process.env.NODE_ENV !== 'production';

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = errorHandler;
