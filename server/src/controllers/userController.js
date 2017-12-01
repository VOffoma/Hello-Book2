import models from '../models';
import helper from '../helper';

/**
 * class for handling user operations
 */
class UserController {
  /**
   * Adds a new user to the database
   * @param {Object} req 
   * @param {Object} res 
   * @return {Object} response object
   */
  static async addNewUser(req, res) {
    const newUser = await models.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'User'
    });
    return ({ statusCode: 201, data: { message: 'user added successfully', newUser } });
  }

  /**
   * Checks if a user is registered on the application
   * @param {Object} req 
   * @param {Object} res 
   * @return {Object} response object
   */
  static async authenticateUser(req, res) {
    const existingUser = await models.User.find({
      where: { username: req.body.username }
    });

    if (existingUser != null) {
      const passwordExists = existingUser.comparePasswords(req.body.password);
      if (passwordExists === true) {
        const userToken = helper.createToken(existingUser);
        return ({ statusCode: 200, data: { message: 'Authentication successfully', userToken } });
      }
      helper.throwError(401, 'Authentication failed! Wrong Password!');
    } else {
      helper.throwError(404, 'Authentication failed. User not found.');
    }
  }
}

export default UserController;
