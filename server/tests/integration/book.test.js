import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import models from '../../src/models';
import sampleData from '../sampleData';


describe('Book', function () {
  before(async function () {
    await models.sequelize.sync();
    models.Book.destroy({ truncate: true });
    models.Book.bulkCreate(
      sampleData.generateDummyBooks(10),
      { validate: true, individualHooks: true }
    );
  });

  describe('/GET books', function () {
    it('returns all books', async function () {
      const res = await request(app)
        .get('/api/v1/books/');
      expect(res.statusCode).to.equal(200);
      expect(res.body.books).to.be.an('array');
    });
  });

  describe('/GET books/:bookId', function () {
    const bookId = 1;

    it('returns a single book', async function () {
      const res = await request(app)
        .get(`/api/v1/books/${bookId}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.book).to.be.an('object');
    });
  });
});

