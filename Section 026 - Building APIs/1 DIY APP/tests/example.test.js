// practice test, nothing connected to the program

import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';

const chai = chaiModule.use(chaiHttp);
const { assert } = chai;

describe('+', () => {
  it('returns the sum of its arguments', () => {
    // Write assertion here
    assert.ok(3 + 4 === 7);
  });
});
