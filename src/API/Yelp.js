'use strict';
class Yelp {
  constructor(yelpAPI, env) {
    this.yelpAPI = yelpAPI;
    this.env = env;
    this.client = this.yelpAPI.client(
      this.env.YELP.YELP_API_KEY, {
        socketTimeout: 5000
      }
    )
  }

  async getBiz(term, location) {
    try {
      const res = await this.client.search({ term, location });
      return res.jsonBody.businesses[0];
    } catch (e) {
      console.error('Something went wrong!', e);
      throw e;
    }
  }

  async getBizReviews(biz) {
    try {
      const res = await this.client.reviews(biz);
      return res.jsonBody.reviews[0].text;
    } catch (e) {
      console.error('Something went wrong!', e);
      throw e;
    }
  }
}

module.exports = Yelp;
