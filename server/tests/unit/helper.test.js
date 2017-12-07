import { expect } from 'chai';
import helper from '../../src/helper';

describe('Helper', function () {
  describe('.throwError method', function () {
    const statusCode = 404;
    const errorMessage = 'Resource not found';

    it('throws an error when statuscode and errormessage is passed', function () {
      expect(function () { helper.throwError(statusCode, errorMessage); })
        .to.Throw();
    });
  });
});
