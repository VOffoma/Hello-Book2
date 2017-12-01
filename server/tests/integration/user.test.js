import request from 'supertest';
import { expect } from 'chai';
import models from '../../src/models';
import app from '../../src/server';

describe('User', function () {
  let user;

  describe('/POST users/signup', function () {
    beforeEach(function () {
      user = { username: 'victoria', email: 'victoria@gmail.com', password: 'helloworld' };
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
    beforeEach(function () {
      user = { username: 'victoria', password: 'helloworld' };
    });

    it('returns 422 when an invalid data is passed ', async function () {
      user.username = 'v';
      const res = await request(app)
        .post('/api/v1/users/signin')
        .send(user);
      expect(res.statusCode).to.equal(422);
    });

    it('returns 401 when the wrong password is passed ', async function () {
      user.password = 'hello';
      const res = await request(app)
        .post('/api/v1/users/signin')
        .send(user);
      expect(res.statusCode).to.equal(401);
    });

    it('returns 401 when the user is not found during authentication', async function () {
      user.username = 'sandra';
      const res = await request(app)
        .post('/api/v1/users/signin')
        .send(user);
      expect(res.statusCode).to.equal(404);
    });

    it('returns the token after successfully login', async function () {
      const res = await request(app)
        .post('/api/v1/users/signin')
        .send(user);
      expect(res.body.userToken).to.be.a('string');
      expect(res.statusCode).to.equal(200);
    });
  });


  after(function () {
    models.User.destroy({
      where: {},
      truncate: true
    });
  });
});

