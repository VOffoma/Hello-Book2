import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import models from '../../src/models';
import sampleData from '../sampleData';

describe('User', function () {
  let user;
  before(async function () {
    await models.User.sequelize.sync();
    models.User.destroy({ truncate: true });
  });

  describe('/POST users/signup', function () {
    beforeEach(function () {
      user = sampleData.generateADummyUser();
    });

    it('returns 422 when an invalid data is passed ', async function () {
      user.username = '';
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send(user);
      expect(res.statusCode).to.equal(422);
    });
    it('returns user detail when a user is registered successfully ', async function () {
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send(user);
      expect(res.body.newUser.username).to.equal(user.username);
      expect(res.statusCode).to.equal(201);
    });
  });

  describe('/POST users/signin', function () {
    let resp, loginCredentials;

    beforeEach(function () {
      loginCredentials = { username: user.username, password: user.password };
    });

    it('returns 422 when an invalid data is passed ', async function () {
      loginCredentials.username = 'v';
      resp = await request(app)
        .post('/api/v1/users/signin')
        .send(loginCredentials);
      expect(resp.statusCode).to.equal(422);
    });

    it('returns 401 when the wrong password is passed ', async function () {
      loginCredentials.password = 'hello';
      resp = await request(app)
        .post('/api/v1/users/signin')
        .send(loginCredentials);
      expect(resp.statusCode).to.equal(401);
    });

    it('returns 401 when the user is not found during authentication', async function () {
      loginCredentials.username = 'sandra';
      resp = await request(app)
        .post('/api/v1/users/signin')
        .send(loginCredentials);
      expect(resp.statusCode).to.equal(404);
    });

    it('returns the token after successfully login', async function () {
      resp = await request(app)
        .post('/api/v1/users/signin')
        .send(loginCredentials);
      expect(resp.body.userToken).to.be.a('string');
      expect(resp.statusCode).to.equal(200);
    });
  });


  // after(function () {
  //   models.User.destroy({
  //     where: {},
  //     truncate: true
  //   });
  // });
});

