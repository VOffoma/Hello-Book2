/**
 * class for housing helpful functions
 */
class Helper {
  /**
   * @description this function throws an error
   * @param {number} statusCode
   * @param {string|Object} errorMessage
   * @return {object} error
   */
  static throwError(statusCode, errorMessage) {
    let error = {};
    if (errorMessage instanceof Object) {
      // get the first defective property from errorMessage object
      const invalidProperty = Object.keys(errorMessage)[0];
      error = new Error(errorMessage[invalidProperty].msg);
      error.status = statusCode;
    } else if (typeof errorMessage === 'string' || errorMessage instanceof String) {
      error = new Error(errorMessage);
      error.status = statusCode;
    } else {
      error = new Error('an error has occurred');
    }
    throw error;
  }
}

export default Helper;
