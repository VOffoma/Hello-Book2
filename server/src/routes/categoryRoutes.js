import express from 'express';
import { check, validationResult } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import 'express-async-errors';
import categoryController from '../controllers/categoryController';
import helper from '../helper';
import middleware from '../middleware';


const routes = () => {
  const router = express.Router();

  // route for getting all categories present
  router.route('/')
    .get(async (req, res) => {
      const response = await categoryController.getAllCategories();
      res.status(response.statusCode).send(response.data);
    });

  // route for getting a single category
  router.route('/:categoryId')
    .get([
      check('categoryId').matches(/\d/).withMessage('bookId should be a number'),
      sanitize('categoryId').toInt()
    ], async (req, res) => {
      helper.hasValidationErrors(validationResult(req));
      const response = await categoryController.getCategory(req);
      res.status(response.statusCode).send(response.data);
    });

  // route for getting all the books in a single category
  router.route('/:categoryId/books')
    .get([
      check('categoryId').matches(/\d/).withMessage('bookId should be a number'),
      sanitize('categoryId').toInt()
    ], async (req, res) => {
      helper.hasValidationErrors(validationResult(req));
      const response = await categoryController.getBooksInACategory(req);
      res.status(response.statusCode).send(response.data);
    });

  // middleware that verifies that the user is indeed authenticated
  router.use(async (req, res, next) => {
    await middleware.verifyToken(req);
    next();
  });

  // route for adding a new category
  router.route('/')
    .post(
      (req, res, next) => {
        middleware.isAdminRoutes(req);
        next();
      },
      async (req, res) => {
        const response = await categoryController.addCategory(req);
        res.status(response.statusCode).send(response.data);
      }
    );
  // route for updating a book
  router.route('/:categoryId')
    .put(
      (req, res, next) => {
        middleware.isAdminRoutes(req);
        next();
      },
      [
        check('categoryId').matches(/\d/).withMessage('categoryId should be a number'),
        sanitize('categoryId').toInt()
      ], async (req, res) => {
        helper.hasValidationErrors(validationResult(req));
        const response = await categoryController.updateCategory(req);
        res.status(response.statusCode).send(response.data);
      }
    );

  return router;
};

export default routes;

