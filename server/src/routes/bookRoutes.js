import express from 'express';
import { check, validationResult } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import 'express-async-errors';
import bookController from '../controllers/bookController';
import helper from '../helper';
import middleware from '../middleware';


const routes = () => {
  const router = express.Router();

  // route for getting all books present
  router.route('/')
    .get(async (req, res) => {
      const response = await bookController.getAllBooks();
      res.status(response.statusCode).send(response.data);
    });

  // route for getting a single book
  router.route('/:bookId')
    .get([
      check('bookId').matches(/\d/).withMessage('bookId should be a number'),
      sanitize('bookId').toInt()
    ], async (req, res) => {
      helper.hasValidationErrors(validationResult(req));
      const response = await bookController.getBook(req);
      res.status(response.statusCode).send(response.data);
    });

  // middleware that verifies that the user is indeed authenticated
  router.use(async (req, res, next) => {
    await middleware.verifyToken(req);
    next();
  });

  // route for adding a new book
  router.route('/')
    .post(
      (req, res, next) => {
        middleware.isAdminRoutes(req);
        next();
      },
      async (req, res) => {
        const response = await bookController.addBook(req);
        res.status(response.statusCode).send(response.data);
      }
    );
  // route for updating a book
  router.route('/:bookId')
    .put(
      (req, res, next) => {
        middleware.isAdminRoutes(req);
        next();
      },
      [
        check('bookId').matches(/\d/).withMessage('bookId should be a number'),
        sanitize('bookId').toInt(),
        check('quantity').matches(/\d*/).withMessage('quantity should be a number'),
      ], async (req, res) => {
        helper.hasValidationErrors(validationResult(req));
        const response = await bookController.updateBook(req);
        res.status(response.statusCode).send(response.data);
      }
    );

  return router;
};

export default routes;

