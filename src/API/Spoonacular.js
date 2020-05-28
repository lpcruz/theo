const request = require('request-promise');

const env = require('../../config/env');

class Spoonacular {
  async getRecipes(query) {
    return await request(`https://api.spoonacular.com/recipes/search?apiKey=${env.SPOONACULAR.SPOONACULAR_API_KEY}&query=${query}&number=10`);
  }
}

module.exports = Spoonacular;
