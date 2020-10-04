  
const { randomizeWarmup } = require('../cronjobs/wodbot');
const warmups = require('../shared/wod/warmups');

describe('Wodbot', () => {
  describe('randomizeWarmup', () => {
    it('should return a string', () => {
      expect(typeof randomizeWarmup(warmups)).toEqual('string')
    });
  });
});