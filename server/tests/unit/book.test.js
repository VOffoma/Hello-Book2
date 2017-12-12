import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import bookController from '../../src/controllers/bookController';
import models from '../../src/models';
import sampleData from '../sampleData';

describe('Book', function () {
  let bookId, book;

  before(async function () {
    await models.Book.sequelize.sync();
    models.Book.destroy({ truncate: true });
  });

  describe('.addBook method', function () {
    let result, req;

    beforeEach(function () {
      book = sampleData.generateADummyBook();
      req = httpMocks.createRequest({ body: book });
    });

    it('create new book', async function () {
      result = await bookController.addBook(req);
      bookId = result.data.newBook.id;
      expect(result.data.newBook).to.be.an('object');
      expect(result.data.newBook.title).to.equal(book.title);
    });
  });


  describe('.getAllBooks method', function () {
    let resp;
    it('fetch all books', async function () {
      resp = await bookController.getAllBooks();
      expect(resp.data.books).to.be.an('array');
      expect(resp.data.books.length).to.be.above(0);
    });
  });

  describe('.getBook method', function () {
    let req, resp;

    beforeEach(function () {
      req = httpMocks.createRequest({ params: { bookId } });
    });

    it('fetches a book when a valid bookId is passed', async function () {
      resp = await bookController.getBook(req);
      expect(resp.data.book).to.be.a('object');
      expect(resp.data.book.title).to.equal(book.title);
    });
  });

  describe('.updateBook method', function () {
    let resp, req, bookUpdate;

    beforeEach(function () {
      bookUpdate = sampleData.generateADummyBook();
      req = httpMocks.createRequest({ body: bookUpdate, params: { bookId } });
    });

    it('updates a book', async function () {
      resp = await bookController.updateBook(req);
      expect(resp.data.updatedBook).to.be.an('object');
      expect(resp.data.updatedBook.title).to.equal(bookUpdate.title);
    });
  });
});
