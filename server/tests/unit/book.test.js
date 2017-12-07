import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import bookController from '../../src/controllers/bookController';
import models from '../../src/models';
import sampleData from '../sampleData';

describe('Book', function () {
  before(async function () {
    await models.Book.sequelize.sync();
    models.Book.destroy({ truncate: true });
    models.Book.bulkCreate(
      sampleData.generateDummyBooks(10),
      { validate: true, individualHooks: true }
    );
  });

  describe('.addNewUser method', function () {
    let result;
    it('fetch all books', async function () {
      result = await bookController.getAllBooks();
      expect(result.data.books).to.be.an('array');
    });
  });

  describe('.getBook method', function () {
    let req, result;

    beforeEach(function () {
      req = httpMocks.createRequest({ params: { bookId: 1 } });
    });

    it('fetches a book when a valid bookId is passed', async function () {
      result = await bookController.getBook(req);
      expect(result.data.book).to.be.a('object');
    });
  });
});
