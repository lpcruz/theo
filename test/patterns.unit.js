  
const assert = require('chai').assert;

const PATTERNS = require('../shared/patterns')
/* eslint-disable no-undef */
describe('Patterns', () => {
  describe('GREETINGS', () => {
    it('should retrieve a matching string if a user says "hi"', () => {
      const string = '@theo hi there my friend!';
      const actual = string.match(PATTERNS.GREETINGS);
      assert.deepStrictEqual(actual.join(''), 'hi');
    });
      
    it('should retrieve a matching string if a user says "hey"', () => {
      const string = '@theo hey!';
      const actual = string.match(PATTERNS.GREETINGS);
      assert.deepStrictEqual(actual.join(''), 'hey');
    });
    
    it('should retrieve a matching string if a user says "hey"', () => {
      const string = '@theo yo!!!';
      const actual = string.match(PATTERNS.GREETINGS);
      assert.deepStrictEqual(actual.join(''), 'yo');
    });
    
    it('should retrieve a matching string if a user says "hello"', () => {
      const string = '@theo hello!';
      const actual = string.match(PATTERNS.GREETINGS);
      assert.deepStrictEqual(actual.join(''), 'hello');
    });
      
    it('should be null when a string does not match', () => {
      const string = '@theo';
      const actual = string.match(PATTERNS.GREETINGS);
      assert.deepStrictEqual(actual, null);
    });
  });
  describe('SEARCH', () => {
    it('should retrieve a matching string if a user says "search"', () => {
      const string = '@theo search for bars in nyc';
      const actual = string.match(PATTERNS.SEARCH);
      assert.deepStrictEqual(actual.join(''), 'search');
    });
  });
    
  describe('WEATHER', () => {
    it('should retrieve a matching string if a user says "weather in"', () => {
      const string = '@theo weather in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      assert.deepStrictEqual(actual.pop(), 'weather in');
    });
      
    it('should retrieve a matching string if a user says "temperature in"', () => {
      const string = '@theo temperature in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      assert.deepStrictEqual(actual.pop(), 'temperature in');
    });
      
    it('should retrieve a matching string if a user says "forecast in"', () => {
      const string = '@theo forecast in nyc';
      const actual = string.match(PATTERNS.WEATHER);
      assert.deepStrictEqual(actual.pop(), 'forecast in');
    });
  });
    
  describe('SPOTIFY_PLAYLIST', () => {
    it('should retrieve a matching string if a user says "feeling"', () => {
      const string = '@theo feeling happy and sad and mad and confused?!';
      const actual = string.match(PATTERNS.SPOTIFY_PLAYLIST);
      assert.deepStrictEqual(actual.join(''), 'feeling');
    });
  });
    
  describe('COVID19', () => {
    it('should retrieve a matching string if a user says "covid19 data for"', () => {
      const string = '@theo covid19 data for nyc';
      const actual = string.match(PATTERNS.COVID19);
      assert.deepStrictEqual(actual.pop(), 'covid19 data for');
    });
  });

  describe('HELP', () => {
    it('should retrieve a matching string if a user says "help"', () => {
      const string = '@theo help';
      const actual = string.match(PATTERNS.HELP);
      assert.deepStrictEqual(actual.join(''), 'help');
    });
  });
    
  describe('HELP', () => {
    it('should retrieve a matching string if a user says "assist"', () => {
      const string = '@theo assist me!';
      const actual = string.match(PATTERNS.HELP);
      assert.deepStrictEqual(actual.join(''), 'assist');
    });
  });
    
  describe('RECIPES', () => {
    it('should retrieve a matching string if a user says "recipe for"', () => {
      const string = '@theo recipe for pizza';
      const actual = string.match(PATTERNS.RECIPES);
      assert.deepStrictEqual(actual.pop(), 'recipe for');
    });
  });
    
  describe('RECIPES', () => {
    it('should retrieve a matching string if a user says "recipes for"', () => {
      const string = '@theo recipes for pizza';
      const actual = string.match(PATTERNS.RECIPES);
      assert.deepStrictEqual(actual.pop(), 'recipes for');
    });
  });
    
  describe('INGREDIENTS_BASED_RECIPE', () => {
    it('should retrieve a matching string if a user says "recipe using"', () => {
      const string = '@theo recipe using sazon';
      const actual = string.match(PATTERNS.INGREDIENTS_BASED_RECIPE);
      assert.deepStrictEqual(actual.pop(), 'recipe using');
    });
      
    it('should retrieve a matching string if a user says "recipes using ingredients"', () => {
      const string = '@theo recipes using ingredients salt and pepper';
      const actual = string.match(PATTERNS.INGREDIENTS_BASED_RECIPE);
      assert.deepStrictEqual(actual.pop(), 'recipes using ingredients');
    });
  });
});
