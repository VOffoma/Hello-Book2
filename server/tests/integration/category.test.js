import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import models from '../../src/models';
import sampleData from '../sampleData';


describe('Category', function () {
  let categoryId, category;

  before(async function () {
    await models.sequelize.sync();
    models.Category.destroy({ truncate: true });
  });

  describe('/POST categories/', function () {
    let token;
    beforeEach(function () {
      category = sampleData.generateADummyCategory();
      token = sampleData.generateDummyToken();
    });

    it('creates a new Category', async function () {
      const resp = await request(app)
        .post('/api/v1/categories/')
        .set('x-access-token', token)
        .send(category);
      // console.log(resp);
      categoryId = resp.body.newCategory.id;
      expect(resp.statusCode).to.equal(201);
      expect(resp.body.newCategory).to.be.an('object');
      expect(resp.body.newCategory.name).to.equal(category.name);
    });
  });

  describe('/GET categories/', function () {
    it('returns all categories', async function () {
      const resp = await request(app)
        .get('/api/v1/categories/');
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.categories).to.be.an('array');
    });
  });

  describe('/GET categories/:categoryId', function () {
    it('returns a single category', async function () {
      const resp = await request(app)
        .get(`/api/v1/categories/${categoryId}`);
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.category).to.be.an('object');
    });
  });

  describe('/PUT categories/:categoryId', function () {
    let categoryUpdate, token;

    beforeEach(function () {
      categoryUpdate = sampleData.generateADummyCategory();
      token = sampleData.generateDummyToken();
    });

    it('updates a specified Category', async function () {
      const resp = await request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('x-access-token', token)
        .send(categoryUpdate);
      expect(resp.statusCode).to.equal(200);
      expect(resp.body.updatedCategory).to.be.an('object');
      expect(resp.body.updatedCategory.name).to.equal(categoryUpdate.name);
    });
  });
});

