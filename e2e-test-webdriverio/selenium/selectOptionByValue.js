const { By } = require("selenium-webdriver");

const applyOnFirstMatchingElement = require("./applyOnFirstMatchingElement");

function selectOptionByValue(expectedValue) {
  return async selectElement => {
    return selectElement
      .findElements(By.tagName("option"))
      .then(
        applyOnFirstMatchingElement(
          async element => {
            const value = await element.getAttribute("value");
            return value === expectedValue;
          },
          element => element.click()
        )
      )
      .catch(() => {
        throw new Error(`Option with value "${expectedValue}" not selected`);
      });
  };
}

module.exports = selectOptionByValue;
