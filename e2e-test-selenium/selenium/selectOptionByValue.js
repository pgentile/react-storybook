const { By } = require("selenium-webdriver");

const firstElementMatching = require("./firstElementMatching");
const NoMatchError = require("./NoMatchError");

function selectOptionByValue(expectedValue) {
  const selectOption = firstElementMatching(async element => {
    const value = await element.getAttribute("value");
    return value === expectedValue;
  });

  return async selectElement => {
    return selectElement
      .findElements(By.tagName("option"))
      .then(selectOption)
      .then(option => option.click())
      .catch(e => {
        if (e instanceof NoMatchError) {
          throw new Error(`Option with value "${expectedValue}" not selected`);
        }
        throw e;
      });
  };
}

module.exports = selectOptionByValue;
