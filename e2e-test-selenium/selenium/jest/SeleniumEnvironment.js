const NodeEnvironment = require("jest-environment-node");
const { Builder, By, until } = require("selenium-webdriver"); // eslint-disable-line no-restricted-modules

class SeleniumEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    const configCapabilities = config.testEnvironmentOptions.capabilities || {};

    this.capabilities = {
      browserName: "chrome",
      ...configCapabilities
    };
  }

  async setup() {
    await super.setup();

    const driver = await new Builder().withCapabilities(this.capabilities).build();

    this.global.driver = driver;

    // Re-export Webdriver globals. Otherwise, it doesn't work with test imports
    this.global.By = By;
    this.global.until = until;
  }

  async teardown() {
    const driver = this.global.driver;
    if (driver) {
      try {
        await driver.quit();
      } catch (e) {
        console.warn("SeleniumEnvironment : Got an exception on driver quit", e);
      }
    }
    await super.teardown();
  }
}

module.exports = SeleniumEnvironment;
