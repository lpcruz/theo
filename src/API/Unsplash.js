const request = require('request-promise');

const env = require('../../config/env');

class Unsplash {
  async getPhoto(query) {
    return await request(`https://api.unsplash.com/search/photos/?client_id=${env.UNSPLASH.UNSPLASH_ACCESS_KEY}&query=${query}`);
  }
}

module.exports = Unsplash;
