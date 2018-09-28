module.exports = {
  rootDir: ".",
  // globalSetup: "./selenium/jest/globalSetup.js",
  // globalTeardown: "./selenium/jest/globalTeardown.js",
  testEnvironment: "./selenium/jest/SeleniumEnvironment.js",
  testEnvironmentOptions: {
    capabilities: {
      browserName: "chrome"
    }
  }
};
