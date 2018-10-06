module.exports = {
  rootDir: ".",
  setupTestFrameworkScriptFile: "jest-extended",
  testEnvironment: "./selenium/jest/SeleniumEnvironment.js",
  testEnvironmentOptions: {
    capabilities: {
      browserName: "chrome"
    }
  }
};
