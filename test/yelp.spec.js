require('dotenv').config();
const YelpAPI = require('../server/yelp');
const Yelp = new YelpAPI();
const assert = require('chai').assert;

/* eslint-disable no-undef */
describe('Yelp API', function() {
  describe('getBiz()', function() {
    it('should return a business', function(done) {
      Yelp.getBiz('hamburgers', 'san diego').then(biz => {
        assert.exists(biz.name, 'Yelp returned 1 business');
        done();
      })
    });
  });
});

