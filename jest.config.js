module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  moduleNameMapper: {
    "\\.(scss|css)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transformIgnorePatterns: ["/node_modules/(?!lodash-es)/"],
  coverageDirectory: "../build/coverage"
};
