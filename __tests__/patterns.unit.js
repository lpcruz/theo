  
const PATTERNS = require('../shared/patterns')

describe('Patterns', () => {
  describe('GREETINGS', () => {
    it('should retrieve a matching string if a user says "hi"', () => {
      const string = '@theo hi there my friend!';
      const actual = string.match(PATTERNS.GREETINGS);
      expect(actual.join('')).toEqual('hi');
    });
      
    it('should retrieve a matching string if a user says "hey"', () => {
      const string = '@theo hey!';
      const actual = string.match(PATTERNS.GREETINGS);
      expect(actual.join('')).toEqual('hey');
    });
    
    it('should retrieve a matching string if a user says "hey"', () => {
      const string = '@theo yo!!!';
      const actual = string.match(PATTERNS.GREETINGS);
      expect(actual.join('')).toEqual('yo');
    });
    
    it('should retrieve a matching string if a user says "hello"', () => {
      const string = '@theo hello!';
      const actual = string.match(PATTERNS.GREETINGS);
      expect(actual.join('')).toEqual('hello');
    });
      
    it('should be null when a string does not match', () => {
      const string = '@theo';
      const actual = string.match(PATTERNS.GREETINGS);
      expect(actual).toEqual(null);
    });
  });
  describe('SEARCH', () => {
    it('should retrieve a matching string if a user says "search"', () => {
      const string = '@theo search for bars in nyc';
      const actual = string.match(PATTERNS.SEARCH);
      expect(actual.join('')).toEqual('search');
    });
  });
    
  describe('WEATHER', () => {
    it('should retrieve a matching string if a user says "weather in"', () => {
      const string = '@theo weather in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      expect(actual.pop()).toEqual('weather in');
    });
      
    it('should retrieve a matching string if a user says "temperature in"', () => {
      const string = '@theo temperature in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      expect(actual.pop()).toEqual('temperature in');
    });
      
    it('should retrieve a matching string if a user says "forecast in"', () => {
      const string = '@theo forecast in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      expect(actual.pop()).toEqual('forecast in');
    });
  });
    
  describe('SPOTIFY_PLAYLIST', () => {
    it('should retrieve a matching string if a user says "feeling"', () => {
      const string = '@theo feeling happy and sad and mad and confused?!';
      const actual = string.match(PATTERNS.SPOTIFY_PLAYLIST);
      expect(actual.join('')).toEqual('feeling');
    });
  });
    
  describe('COVID19', () => {
    it('should retrieve a matching string if a user says "covid19 data for"', () => {
      const string = '@theo covid19 data for nyc';
      const actual = string.match(PATTERNS.COVID19);
      expect(actual.pop()).toEqual('covid19 data for');
    });
  });

  describe('HELP', () => {
    it('should retrieve a matching string if a user says "help"', () => {
      const string = '@theo help';
      const actual = string.match(PATTERNS.HELP);
      expect(actual.join('')).toEqual('help');
    });
  });
    
  it('should retrieve a matching string if a user says "assist"', () => {
    const string = '@theo assist me!';
    const actual = string.match(PATTERNS.HELP);
    expect(actual.join('')).toEqual('assist');
  });
    
  describe('RECIPES', () => {
    it('should retrieve a matching string if a user says "recipe for"', () => {
      const string = '@theo recipe for pizza';
      const actual = string.match(PATTERNS.RECIPES);
      expect(actual.pop()).toEqual('recipe for');
    });
  });

  it('should retrieve a matching string if a user says "recipes for"', () => {
    const string = '@theo recipes for pizza';
    const actual = string.match(PATTERNS.RECIPES);
    expect(actual.pop()).toEqual('recipes for');
  });
    
  describe('INGREDIENTS_BASED_RECIPE', () => {
    it('should retrieve a matching string if a user says "recipe using"', () => {
      const string = '@theo recipe using sazon';
      const actual = string.match(PATTERNS.INGREDIENTS_BASED_RECIPE);
      expect(actual.pop()).toEqual('recipe using');
    });
      
    it('should retrieve a matching string if a user says "recipes using ingredients"', () => {
      const string = '@theo recipes using ingredients salt and pepper';
      const actual = string.match(PATTERNS.INGREDIENTS_BASED_RECIPE);
      expect(actual.pop()).toEqual('recipes using ingredients');
    });
  });
});
