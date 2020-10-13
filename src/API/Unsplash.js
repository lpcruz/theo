'use strict';
class Unsplash {
  constructor(request, env) {
    this.request = request;
    this.env = env;
  }
  async getPhoto(query) {
    const endpoint = `https://api.unsplash.com/search/photos/?client_id=${this.env.UNSPLASH.UNSPLASH_ACCESS_KEY}&query=${query}`;
    return await this.request(endpoint);
  }
}

module.exports = Unsplash;
