/**
 * Wraps async route handlers so thrown errors are forwarded
 * to Express's next(err) without try/catch boilerplate everywhere.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
