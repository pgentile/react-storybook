import { Builder, By, until } from "selenium-webdriver";
import { addDays, setHours, format, parse } from "date-fns";

import applyOnFirstMatchingElement from "./selenium/applyOnFirstMatchingElement";
import selectOptionByValue from "./selenium/selectOptionByValue";
import writeScreenshot from "./selenium/writeScreenshot";

jest.setTimeout(60 * 1000);

describe("Tests with Selenium API", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("safari").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  afterEach(async () => {
    await writeScreenshot(driver, "screenshot.png");
    await driver.close();
  });

  test.skip("It should get the list", async () => {
    await driver.get("http://localhost:10101/list.html");

    const listItems = await driver.findElements(By.css(".list li"));
    const itemTexts = await Promise.all(listItems.map(listItem => listItem.getText()));
    console.info("itemTexts =", itemTexts);
  });

  test("Search on OUI.sncf", async () => {
    const page = await OuiHomePage.init(driver);

    const today = new Date();
    const departureDate = setHours(addDays(today, 7), 7);

    await page.selectOrigin("Rennes");
    await page.selectDestination("Paris");
    await page.setTravelDirect(true);
    await page.selectDepartureDate(departureDate);
  });
});

class OuiHomePage {
  static async init(driver) {
    await driver.get("http://oui.sncf");
    const page = new OuiHomePage(driver);
    await page.getRidOfAnnoyingPopins();
    return page;
  }

  constructor(driver) {
    this.driver = driver;
  }

  async getRidOfAnnoyingPopins() {
    await this.getRidOfCookiePolicy();
    await this.getRidOfOuibot();
  }

  async getRidOfCookiePolicy() {
    await this.driver
      .wait(until.elementLocated(By.id("cookie-policy-popin")))
      .findElement(By.id("cookie-policy-close"))
      .click();
  }

  async getRidOfOuibot() {
    await this.driver
      .wait(until.elementLocated(By.className("ouibot-ancrage")))
      .findElement(By.className("ouibot-ancrage__close__close-icon"))
      .click();
  }

  async selectOrigin(origin) {
    await this.driver.findElement(By.id("vsb-origin-train")).sendKeys(origin);

    await this.driver
      .wait(until.elementLocated(By.css("#d2d-autocomplete-origin-train .vsb-dropdown-new__item")))
      .click();
  }

  async selectDestination(origin) {
    await this.driver.findElement(By.id("vsb-destination-train")).sendKeys(origin);

    await this.driver
      .wait(until.elementLocated(By.css("#d2d-autocomplete-destination-train .vsb-dropdown-new__item")))
      .click();
  }

  async selectDepartureDate(anyDate) {
    const date = parse(anyDate);
    const day = format(date, "D");
    const hour = format(date, "H");

    await this.selectDepartureDay(day);
    await this.selectDepartureHour(hour);
  }

  async selectDepartureDay(day) {
    await this.driver.findElement(By.id("vsb-departure-date-train")).click();
    await this._selectDayInCalendar(day);
  }

  async selectDepartureHour(hour) {
    const hourElement = this.driver.findElement(By.className("booking__form-outward-time"));
    await this._selectHour(hourElement, hour);
  }

  async setTravelDirect(travelDirect) {
    const bookingForm = this.driver.findElement(By.className("booking__form"));

    const checkbox = bookingForm.findElement(By.name("direct-travel"));
    const checked = (await checkbox.getAttribute("checked")) || false;

    if (travelDirect !== checked) {
      const label = bookingForm.findElement(By.className("booking__form-direct-travel"));
      await label.click();
    }
  }

  async _selectHour(hourElement, hour) {
    await hourElement.click();
    await hourElement.findElement(By.css("select.booking__form-select")).then(selectOptionByValue(hour));
  }

  async _selectDayInCalendar(day) {
    const clickOnDay = applyOnFirstMatchingElement(
      async element => {
        const text = await element.getText();
        return text === day;
      },
      element => element.click()
    );

    await this.driver
      .wait(until.elementLocated(By.className("date-selector")))
      .findElements(By.css(".month-cal td.selectable_day"))
      .then(clickOnDay);
  }
}
