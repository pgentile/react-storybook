module.exports = {
  rootDir: ".",
  setupFiles: ["./selenium/jest/timeout.js"],
  setupFilesAfterEnv: ["jest-extended"],
  testEnvironment: "./selenium/jest/SeleniumEnvironment.js",
  testEnvironmentOptions: {
    capabilities: {
      browserName: "chrome"
    }
  }
};
