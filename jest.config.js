module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  moduleNameMapper: {
    "\\.s?css$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "\\.jsx?$": "babel-jest",
    "\\.svg$": "<rootDir>/__mocks__/imageMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/../setupTests.js"],
  setupFiles: ["<rootDir>/../registerContext.js"],
  transformIgnorePatterns: ["node_modules/(?!lodash-es)"],
  coverageDirectory: "<rootDir>/../build/coverage"
};
