module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '!<rootDir>/*.d.ts'
  ]
};