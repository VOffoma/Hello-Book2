import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import models from '../../src/models';
import sampleData from '../sampleData';


describe('Book', function () {
  let bookId, book;

  before(async function () {
    await models.sequelize.sync();
    models.Book.destroy({ truncate: true });
  });

  describe('/POST books/', function () {
    let token;
    beforeEach(function () {
      book = sampleData.generateADummyBook();
      token = sampleData.generateDummyToken();
    });

    it('creates a new book', async function () {
      const resp = await request(app)
        .post('/api/v1/books/')
        .set('x-access-token', token)
        .send(book);
      // console.log(resp);
      bookId = resp.body.newBook.id;
      expect(resp.statusCode).to.equal(201);
      expect(resp.body.newBook).to.be.an('object');
      expect(resp.body.newBook.title).to.equal(book.title);
    });
  });

  describe('/GET books', function () {
    it('returns all books', async function () {
      const resp = await request(app)
        .get('/api/v1/books/');
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.books).to.be.an('array');
    });
  });

  describe('/GET books/:bookId', function () {
    it('returns a single book', async function () {
      const resp = await request(app)
        .get(`/api/v1/books/${bookId}`);
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.book).to.be.an('object');
    });
  });

  describe('/PUT books/:bookId', function () {
    let bookUpdate, token;

    beforeEach(function () {
      bookUpdate = sampleData.generateADummyBook();
      token = sampleData.generateDummyToken();
    });

    it('updates a specified book', async function () {
      const resp = await request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('x-access-token', token)
        .send(bookUpdate);
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.updatedBook).to.be.an('object');
      expect(resp.body.updatedBook.title).to.equal(bookUpdate.title);
    });
  });
});

