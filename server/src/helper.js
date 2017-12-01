import jwt from 'jsonwebtoken';

/**
 * class for housing helpful functions
 */
class Helper {
  /**
   *@description creates tokens
   * @param {Object} user
   * @return {string} token
   */
  static createToken(user) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'VOR4MA.1', {
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    });
    return token;
  }
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
