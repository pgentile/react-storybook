module.exports = {
  rootDir: ".",
  setupFilesAfterEnv: ["jest-extended"],
  testEnvironment: "./selenium/jest/SeleniumEnvironment.js",
  testEnvironmentOptions: {
    capabilities: {
      browserName: "chrome"
    }
  }
};
