import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import categoryController from '../../src/controllers/categoryController';
import models from '../../src/models';
import sampleData from '../sampleData';

describe('Category', function () {
  let categoryId, category;

  before(async function () {
    await models.Category.sequelize.sync();
    models.Category.destroy({ truncate: true });
  });

  describe('.addCategory method', function () {
    let result, req;

    beforeEach(function () {
      category = sampleData.generateADummyCategory();
      req = httpMocks.createRequest({ body: category });
    });

    it('create new category', async function () {
      result = await categoryController.addCategory(req);
      categoryId = result.data.newCategory.id;
      expect(result.data.newCategory).to.be.an('object');
      expect(result.data.newCategory.name).to.equal(category.name);
    });
  });


  describe('.getAllCategories method', function () {
    let resp;
    it('fetch all categories', async function () {
      resp = await categoryController.getAllCategories();
      expect(resp.data.categories).to.be.an('array');
      expect(resp.data.categories.length).to.be.above(0);
    });
  });

  describe('.getCategory method', function () {
    let req, resp;

    beforeEach(function () {
      req = httpMocks.createRequest({ params: { categoryId } });
    });

    it('fetches a book when a valid bookId is passed', async function () {
      resp = await categoryController.getCategory(req);
      expect(resp.data.category).to.be.a('object');
      expect(resp.data.category.name).to.equal(category.name);
    });
  });

  describe('.updateCategory method', function () {
    let resp, req, categoryUpdate;

    beforeEach(function () {
      categoryUpdate = sampleData.generateADummyCategory();
      req = httpMocks.createRequest({ body: categoryUpdate, params: { categoryId } });
    });

    it('updates a book', async function () {
      resp = await categoryController.updateCategory(req);
      expect(resp.data.updatedCategory).to.be.an('object');
      expect(resp.data.updatedCategory.name).to.equal(categoryUpdate.name);
    });
  });
});
