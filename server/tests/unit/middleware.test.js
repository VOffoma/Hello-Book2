import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import httpMocks from 'node-mocks-http';
import Middleware from '../../src/middleware';
import sampleData from '../sampleData';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Middleware', function () {
  describe('.verifyToken method', function () {
    let req, token;

    it('throws error when no token is passed', function () {
      req = httpMocks.createRequest({ headers: { 'x-access-token': token } });
      expect(Middleware.verifyToken(req)).to.eventually.throw(Error, /No token provided/);
    });

    it('throws error when an invalid token is passed', function () {
      token = 'jsueiwoe38930sksoei939';
      req = httpMocks.createRequest({ headers: { 'x-access-token': token } });
      expect(Middleware.verifyToken(req)).eventually.throw(Error, /authentication was not successful/);
    });
  });

  describe('.isAdminRoutes method', function () {
    let req;

    it('throws error when there is an unauthorized request of admin routes', async function () {
      req = httpMocks.createRequest({ user: sampleData.generateADummyUser() });
      expect(function () { Middleware.isAdminRoutes(req); })
        .to.Throw(Error, /You have to be an admin to access this route/);
    });
  });
});
