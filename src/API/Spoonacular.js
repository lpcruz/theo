'use strict';
const ENDPOINTS = {
  RECIPE_SEARCH: 'https://api.spoonacular.com/recipes/search?',
  INGREDIENTS_BASED_SEARCH: 'https://api.spoonacular.com/recipes/findByIngredients?'
}

class Spoonacular {
  constructor(request, env) {
    this.request = request;
    this.env = env;
  }

  async getRecipes(query) {
    return await this.request(`${ENDPOINTS.RECIPE_SEARCH}apiKey=${this.env.SPOONACULAR.SPOONACULAR_API_KEY}&query=${query}`);
  }

  async getRecipesBasedOnIngredients(ingredients) {
    return await this.request(`${ENDPOINTS.INGREDIENTS_BASED_SEARCH}apiKey=${this.env.SPOONACULAR.SPOONACULAR_API_KEY}&ingredients=${ingredients}`);
  }
}

module.exports = Spoonacular;
