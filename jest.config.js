module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  moduleNameMapper: {
    "\\.s?css$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.svg$": "<rootDir>/__mocks__/imageMock.js"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transformIgnorePatterns: ["node_modules/(?!lodash-es)"],
  coverageDirectory: "<rootDir>/../build/coverage"
};
