import getStoryUrl from "./getStoryUrl";
import writeScreenshot from "../selenium/writeScreenshot";
import firstElementMatching from "../selenium/firstElementMatching";

describe("Payment / PaymentContainer", () => {
  afterEach(async () => {
    await driver.sleep(300);
    await writeScreenshot("screenshot.png");
    // await driver.close();
  });

  test("Pay with Visa card", async () => {
    await driver.get(getStoryUrl("Payment / PaymentContainer", "main"));
    await driver.sleep(2 * 1000); // Need to wait elements on page for Firefox...

    await driver
      .findElements(By.css(".payment-means__mean"))
      .then(
        firstElementMatching(async element => {
          const inputs = await element.findElements(By.css('input[value="visa"]'));
          return inputs.length > 0;
        })
      )
      .then(element => element.click());

    await driver.findElement(By.name("cardNumber")).sendKeys("4111111111111111");

    const expirationDate = await driver.findElement(By.className("credit-card-form__expiration-date"));
    await expirationDate.findElement(By.className("form-date-input__input--month")).sendKeys("12");
    await expirationDate.findElement(By.className("form-date-input__input--year")).sendKeys("27");

    await driver.findElement(By.name("cvv")).sendKeys("123");

    await driver.findElement(By.css(".credit-card-form__button button")).click();
  });

  test("Pay with Mastercard card", async () => {
    await driver.get(getStoryUrl("Payment / PaymentContainer", "main"));
    await driver.sleep(2 * 1000); // Need to wait elements on page for Firefox...

    await driver
      .findElements(By.css(".payment-means__mean"))
      .then(
        firstElementMatching(async element => {
          const inputs = await element.findElements(By.css('input[value="mastercard"]'));
          return inputs.length > 0;
        })
      )
      .then(element => element.click());

    await driver.findElement(By.name("cardNumber")).sendKeys("5478025848734710");

    const expirationDate = await driver.findElement(By.className("credit-card-form__expiration-date"));
    await expirationDate.findElement(By.className("form-date-input__input--month")).sendKeys("12");
    await expirationDate.findElement(By.className("form-date-input__input--year")).sendKeys("27");

    await driver.findElement(By.name("cvv")).sendKeys("123");

    await driver.findElement(By.css(".credit-card-form__button button")).click();
  });

  test("Pay with registred card", async () => {
    await driver.get(getStoryUrl("Payment / PaymentContainer", "main"));
    await driver.sleep(2 * 1000); // Need to wait elements on page for Firefox...

    await driver
      .findElements(By.css(".payment-means__mean"))
      .then(
        firstElementMatching(async element => {
          const inputs = await element.findElements(By.css('input[value="registred-cards"]'));
          return inputs.length > 0;
        })
      )
      .then(element => element.click());

    const creditCard = await driver.findElement(By.className("registred-credit-card"));

    await creditCard.findElement(By.css(".registred-credit-card__select button")).click();

    const cvvForm = await creditCard.findElement(By.className("registred-card-cvv-form"));
    const cvvInput = await cvvForm.findElement(By.className("registred-card-cvv-form__cvv"));

    await driver.wait(until.elementIsVisible(cvvInput));
    await cvvInput.findElement(By.name("cvv")).sendKeys("123");

    await cvvForm.findElement(By.css('.registred-card-cvv-form__buttons button[type="submit"]')).click();
  });
});
