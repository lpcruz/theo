  
const assert = require('chai').assert;

const { randomizeWarmup } = require('../cronjobs/wodbot');
const warmups = require('../shared/wod/warmups');
/* eslint-disable no-undef */
describe('Wodbot job', () => {
    it('should result in a warmup as a string', () => {
        const res = randomizeWarmup(warmups);
        assert.isString(res);
    });
});