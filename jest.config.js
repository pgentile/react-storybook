module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  moduleNameMapper: {
    "\\.(s?css)$": "<rootDir>/__mocks__/styleMock.js"
  },
  setupTestFrameworkScriptFile: "<rootDir>/../setupTests.js",
  transformIgnorePatterns: ["/node_modules/(?!lodash-es)/"],
  coverageDirectory: "<rootDir>/../build/coverage"
};
