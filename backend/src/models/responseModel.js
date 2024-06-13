/**
 * Creates a standard response object
 * @param {boolean} success - Indicates if the request was successful
 * @param {string} message - A message describing the result
 * @param {object} data - The data to be returned, if any
 * @param {object} error - An error object, if any
 * @returns {object} A standardized response object
 */
export const createResponse = (success, message, data = null, error = null) => {
  return {
    success,
    message,
    data,
    error,
  };
};
