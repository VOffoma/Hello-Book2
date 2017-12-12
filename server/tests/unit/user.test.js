import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import userController from '../../src/controllers/userController';
import models from '../../src/models';
import sampleData from '../sampleData';

describe('User', function () {
  let user;
  before(async function () {
    models.sequelize.sync();
    models.User.destroy({ truncate: true });
  });

  describe('.addNewUser method', function () {
    let req, resp;

    beforeEach(function () {
      user = sampleData.generateADummyUser();
      req = httpMocks.createRequest({ body: user });
    });

    it('encrypts password when a new user is created', async function () {
      resp = await userController.addNewUser(req);
      expect(resp.data.newUser.password).to.not.equal(user.password);
    });

    it('creates user when user details are passed', async function () {
      resp = await userController.addNewUser(req);
      expect(resp.data.newUser.username).to.equal(user.username);
    });
  });

  describe('.authenticateUser method', function () {
    let req, resp, loginCredentials;

    beforeEach(function () {
      loginCredentials = { username: user.username, password: user.password };
      req = httpMocks.createRequest({ body: loginCredentials });
    });

    it('returns token when username and password is authenticated successfully', async function () {
      resp = await userController.authenticateUser(req, resp);
      expect(resp.data.userToken).to.be.a('string');
    });
  });
});
