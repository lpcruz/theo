const assert = require('chai').assert;
/* eslint-disable no-undef */
describe('Travis CI', function() {
  describe('Travis CI Configuration', function() {
    it('should return a string', function(done) {
      const string = `Travis CI is working!`
      assert.isString(string, 'is a string!');
      done();
    })
  });
});


