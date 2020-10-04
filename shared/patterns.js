const PATTERNS = {
  GREETINGS: /\bhi|\bhey\b|\byo\b|hello\b/gi,
  SEARCH: /(search)/g,
  WEATHER: /(weather in)|(temperature in)|(forecast in)/g,
  SPOTIFY_PLAYLIST: /(feeling)/g,
  HELP: /(assist)|(help)/g,
  RECIPES: /(recipe for)|(recipes for)/g,
  INGREDIENTS_BASED_RECIPE: /(recipe using)|(recipes using ingredients)/g,
};

module.exports = PATTERNS;