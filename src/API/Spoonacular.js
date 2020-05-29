const request = require('request-promise');

const env = require('../../config/env');

const ENDPOINTS = {
  RECIPE_SEARCH: 'https://api.spoonacular.com/recipes/search?',
  INGREDIENTS_BASED_SEARCH: 'https://api.spoonacular.com/recipes/findByIngredients?'
}

class Spoonacular {
  async getRecipes(query) {
    return await request(`${ENDPOINTS.RECIPE_SEARCH}apiKey=${env.SPOONACULAR.SPOONACULAR_API_KEY}&query=${query}`);
  }

  async getRecipesBasedOnIngredients(ingredients) {
    return await request(`${ENDPOINTS.INGREDIENTS_BASED_SEARCH}apiKey=${env.SPOONACULAR.SPOONACULAR_API_KEY}&ingredients=${ingredients}`);
  }
}

module.exports = Spoonacular;
