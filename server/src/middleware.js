import jwt from 'jsonwebtoken';
import helper from './helper';


/**
 * class for middleware functions
 */
class Middleware {
  /**
     *@description this function checks that the token exists and is authentic
     * @param {*} req
     * @param {a} res
     * @param {a} next
     * @return {*} throws errors when token is absent or invalid
     */
  static async verifyToken(req) {
    const token = req.body.token || req.params.token || req.headers['x-access-token'];
    if (token) {
      try {
        const user = await jwt.verify(token, 'VOR4MA.1');
        req.user = user;
      } catch (error) {
        req.user = undefined;
        helper.throwError(400, 'invalid token provided');
      }
    } else {
      helper.throwError(403, 'No token provided.');
    }
  }

  /**
   *@description this function checks that the token exists and is authentic
   * @param {*} req
   * @return {function} throws error if an ordinary user tries to access admin routes
   */
  static isAdminRoutes(req) {
    if (req.user.role === 'User') {
      helper.throwError(403, 'You have to be an admin to access this route.');
    }
  }
}

export default Middleware;

