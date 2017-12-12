import { expect } from 'chai';
import helper from '../../src/helper';
import sampleData from '../sampleData';

describe('Helper', function () {
  describe('.throwError method', function () {
    const statusCode = 404;
    const errorMessage = 'Resource not found';

    it('throws an error when statuscode and errormessage is passed', function () {
      expect(function () { helper.throwError(statusCode, errorMessage); })
        .to.Throw(Error, errorMessage);
    });
  });

  // describe('.hasBook method', function () {
  //   it('throws an error when statuscode and errormessage is passed', function () {  
  //   });
  // });

  describe('.createToken method', function () {
    let user;
    beforeEach(function () {
      user = sampleData.generateADummyUser();
      user.id = 1;
    });

    it('returns a string token when a user object is passed', function () {
      expect(helper.createToken(user)).to.be.a('string');
    });
  });
});
