import express from 'express';
import { check, validationResult } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import bookController from '../controllers/bookController';
import helper from '../helper';


const routes = () => {
  const router = express.Router();

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const response = await bookController.getAllBooks();
        res.status(response.statusCode).send(response.data);
      } catch (error) {
        next(error);
      }
    });

  router.route('/:bookId')
    .get([
      check('bookId').matches(/\d/).withMessage('bookId should be a number'),
      sanitize('bookId').toInt()
    ], async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          helper.throwError(422, errors.mapped());
        }
        const response = await bookController.getBook(req);
        res.status(response.statusCode).send(response.data);
      } catch (error) {
        next(error);
      }
    });

  return router;
};

export default routes;

