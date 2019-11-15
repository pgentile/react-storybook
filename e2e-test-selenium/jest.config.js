module.exports = {
  rootDir: ".",
  setupFilesAfterEnv: ["jest-extended", "./jest.setup.js"],
  testEnvironment: "./selenium/jest/SeleniumEnvironment.js",
  testEnvironmentOptions: {
    capabilities: {
      browserName: "chrome"
    }
  }
};
