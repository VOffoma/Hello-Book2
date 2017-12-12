import jwt from 'jsonwebtoken';
import models from './models';
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
   *@description this function checks if the book exist
   * @param {Object} bookId
   * @return {*} book if present
   */
  static async hasBook(bookId) {
    const book = await models.Book.find({ where: { id: bookId } });
    if (book == null) {
      this.throwError(404, 'there is no book with that id!');
    }
    return book;
  }

  /**
   *@description this function checks if the category exist
   * @param {Object} categoryId
   * @return {*} category if present
   */
  static async hasCategory(categoryId) {
    const category = await models.Category.find({ where: { id: categoryId } });
    if (category == null) {
      this.throwError(404, 'there is no category with that id!');
    }
    return category;
  }
  /**
   *@description this function checks if the user exist
   * @param {number} userId
   * @return {*} user if present
   */
  static async hasUser(userId) {
    const user = await models.User.find({ where: { id: userId } });
    if (user == null) {
      this.throwError(404, 'User not found!');
    }
    return user;
  }

  /**
   *@description this function checks if the parameters sent in the req is valid
   * @param {*} validationResult
   * @return {*} throw error when there is a validation error
   */
  static hasValidationErrors(validationResult) {
    const errors = validationResult;
    if (!errors.isEmpty()) {
      this.throwError(422, errors.mapped());
    }
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
