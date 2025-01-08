module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/server/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
};