export default {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"]
};