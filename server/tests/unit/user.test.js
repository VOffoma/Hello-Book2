import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import userController from '../../src/controllers/userController';
import models from '../../src/models';

describe('User', function () {
  describe('.addNewUser method', function () {
    let req, res, result, user;

    beforeEach(function () {
      user = { username: 'victoria2', email: 'victoria2@gmail.com', password: 'helloworld' };
      req = httpMocks.createRequest({ body: user });
      res = httpMocks.createResponse();
    });

    it('encrypts password when a new user is created', async function () {
      result = await userController.addNewUser(req, res);
      expect(result.data.newUser.password).to.not.equal(user.password);
    });

    it('creates user when user details are passed', async function () {
      user.username = 'tochi';
      user.email = 'tochi.offoma@gmail.com';
      result = await userController.addNewUser(req, res);
      expect(result.data.newUser.username).to.equal(user.username);
    });
  });

  describe('.authenticateUser method', function () {
    let req, res, result;

    beforeEach(function () {
      req = httpMocks.createRequest({ body: { username: 'victoria2', password: 'helloworld' } });
      res = httpMocks.createResponse();
    });

    it('returns token when username and password is authenticated successfully', async function () {
      result = await userController.authenticateUser(req, res);
      expect(result.data.userToken).to.be.a('string');
    });
  });

  after(function () {
    models.User.destroy({
      where: {},
      truncate: true
    });
  });
});
