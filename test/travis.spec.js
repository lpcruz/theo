const assert = require('chai').assert;

describe('Travis CI', function() {
    describe('Travis CI Configuration', function() {
        it('should return a string', function(done) {
            const string = `Travis CI is working!`
            assert.isString(string, 'is a string!');
            done();
            })
        });
});


