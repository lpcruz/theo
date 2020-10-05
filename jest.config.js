const path = require('path');

module.exports = {
  testMatch: [
    path.join(__dirname, '__tests__/**/*.unit.js')
  ],
  coverageDirectory: path.join(__dirname, '__tests__/coverage'),
  verbose: true
};
