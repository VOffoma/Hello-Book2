import { expect } from 'chai';
import helper from '../../src/helper';

describe('Helper', function () {
  describe('.createToken method', function () {
    let user;
    before(function () {
      user = { id: 1, username: 'Wanakey', role: 'User' };
    });

    it('returns a string token when a user object is passed', function () {
      expect(helper.createToken(user)).to.be.a('string');
    });
  });

  describe('.throwError method', function () {
    const statusCode = 404;
    const errorMessage = 'Resource not found';

    it('throws an error when statuscode and errormessage is passed', function () {
      expect(function () { helper.throwError(statusCode, errorMessage); })
        .to.Throw();
    });
  });
});
