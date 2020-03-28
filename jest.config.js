/* eslint-env node */

const path = require("path");

module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  moduleNameMapper: {
    "\\.s?css$": "<rootDir>/__mocks__/styleMock.js",
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.svg$": "<rootDir>/__mocks__/imageMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transformIgnorePatterns: ["node_modules/(?!lodash-es)"],
  coverageDirectory: "<rootDir>/../build/coverage",
  cacheDirectory: path.join(__dirname, "node_modules/.cache/jest"),
};
