// utils/responseHandler.js

/**
 * Send a standardized success response.
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Success message
 * @param {Object} [data] - Optional data object
 */
const successResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send a standardized error response.
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 * @param {Object} [errorDetails] - Optional error details object
 */
const errorResponse = (res, statusCode, message, errorDetails = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};

/**
 * Send a paginated response.
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Success message
 * @param {Array} data - Paginated data array
 * @param {Object} pagination - Pagination info (e.g., page, limit, total)
 */
const paginatedResponse = (res, statusCode, message, data, pagination) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};
