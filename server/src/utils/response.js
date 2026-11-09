/**
 * Standard API success response
 */
export function successResponse(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Standard API error response
 */
export function errorResponse(res, message = 'An error occurred', statusCode = 500, errors = null) {
  return res.status(statusCode).json({
    success: false,
    error: message,
    errors,
    timestamp: new Date().toISOString(),
  });
}

export default {
  successResponse,
  errorResponse,
};
