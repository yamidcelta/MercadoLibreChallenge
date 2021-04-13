module.exports = {
  clearMocks: true,
  testTimeout: 10000,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: [
      "<rootDir>/tests"
  ],
  testEnvironment: "node",
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  },
};