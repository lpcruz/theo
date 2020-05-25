const yelp = require('yelp-fusion');

const env = require('../../config/env');
const client = yelp.client(
  env.YELP.YELP_API_KEY, {
    socketTimeout: 5000
  });

class Yelp { 
  async getBiz(term, location) {
    try {
      const res = await client.search({ term, location });
      return res.jsonBody.businesses[0];
    } catch (e) {
      console.error('Something went wrong!', e);
      throw e;
    }
  }

  async getBizReviews(biz) {
    try {
      const res = await client.reviews(biz);
      return res.jsonBody.reviews[0].text;
    } catch (e) {
      console.error('Something went wrong!', e);
      throw e;
    }
  }
}


module.exports = Yelp;