import { expect } from 'chai';
import { add } from '../src/add';

describe('sample test', () => {
  it('addition of 2 and 3 should be 5', () => {
    expect(add(2, 3)).to.equal(5);
  });
});
