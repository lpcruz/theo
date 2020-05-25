const PATTERNS = {
  GREETINGS: /\bhi|\bhey\b|\byo\b|hello\b/gi,
  SEARCH: /(search)/g,
  WEATHER: /(weather in)|(temperature in)|(forecast in)/,
  SPOTIFY_PLAYLIST: /(feeling)/g,
  COVID19: /(covid19 data for)/g,
};

module.exports = PATTERNS;