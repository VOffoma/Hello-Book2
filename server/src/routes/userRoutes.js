import express from 'express';
import { check, validationResult } from 'express-validator/check';
import userController from '../controllers/userController';
import helper from '../helper';


const routes = () => {
  const router = express.Router();

  router.route('/signup')
    .post(async (req, res, next) => {
      try {
        const response = await userController.addNewUser(req, res);
        res.status(response.statusCode).send(response.data);
      } catch (error) {
        next(error);
      }
    });

  router.route('/signin')
    .post(
      [
        check('username', 'Please enter a valid username').exists().trim().isLength({ min: 2 })
          .withMessage('username should be a minimum of 2 chars'),
        check('password', 'Please enter a valid password').exists().trim().isLength({ min: 3 })
          .withMessage('password should be a minimum of 2 chars')
      ],
      async (req, res, next) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            helper.throwError(422, errors.mapped());
          }
          const response = await userController.authenticateUser(req, res);
          res.status(response.statusCode).send(response.data);
        } catch (error) {
          next(error);
        }
      }
    );

  return router;
};

export default routes;

