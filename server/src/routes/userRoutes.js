import express from 'express';
import { check, validationResult } from 'express-validator/check';
import 'express-async-errors';
import userController from '../controllers/userController';
import helper from '../helper';


const routes = () => {
  const router = express.Router();

  // route to register user
  router.route('/signup')
    .post(async (req, res) => {
      const response = await userController.addNewUser(req);
      res.status(response.statusCode).send(response.data);
    });

  // route to authenticate user
  router.route('/signin')
    .post(
      [
        check('username', 'Please enter a valid username').exists().trim().isLength({ min: 2 })
          .withMessage('username should be a minimum of 2 chars'),
        check('password', 'Please enter a valid password').exists().trim().isLength({ min: 3 })
          .withMessage('password should be a minimum of 2 chars')
      ],
      async (req, res) => {
        helper.hasValidationErrors(validationResult(req));
        const response = await userController.authenticateUser(req);
        res.status(response.statusCode).send(response.data);
      }
    );

  return router;
};

export default routes;

