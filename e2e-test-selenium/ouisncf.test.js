import { Builder, By, until } from "selenium-webdriver";
import { addDays, setHours, format, parse } from "date-fns";

import firstElementMatching from "./selenium/firstElementMatching";
import selectOptionByValue from "./selenium/selectOptionByValue";
import writeScreenshot from "./selenium/writeScreenshot";
import applyOnElements from "./selenium/applyOnElements";
import elementsMatching from "./selenium/elementsMatching";

jest.setTimeout(60 * 1000);

describe("Tests with Selenium API", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("safari").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver
      .manage()
      .window()
      .maximize();
  });

  afterEach(async () => {
    await driver.sleep(300);
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
    const homePage = await OuiHomePage.init(driver);

    const today = new Date();
    const departureDate = setHours(addDays(today, 7), 7);

    await homePage.selectOrigin("Rennes");
    await homePage.selectDestination("Paris");
    await homePage.setTravelDirect(true);
    await homePage.selectDepartureDate(departureDate);
    await homePage.addPassenger();
    await homePage.lessPassenger();
    await homePage.setTravelClass(1);

    const proposalPage = await homePage.search();
    await proposalPage.waitForProposals();
    await proposalPage.getMoreProposals();

    const prices = await proposalPage.getPrices().then(applyOnElements(element => element.getText()));
    prices.forEach(price => console.info("Price =", price));
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

  async selectDepartureDate(date) {
    await this.selectDepartureDay(date);
    await this.selectDepartureHour(date);
  }

  async selectDepartureDay(date) {
    await this.driver.findElement(By.id("vsb-departure-date-train")).click();
    await this._selectDayInCalendar(date);
  }

  async selectDepartureHour(anyDate) {
    const date = parse(anyDate);
    const hour = format(date, "H");

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

  async setTravelClass(travelClass) {
    let travelClassName;
    if (travelClass === 1) {
      travelClassName = "first";
    } else if (travelClassName === 2) {
      travelClassName = "second";
    } else {
      throw new Error(`Unknown travel class: ${travelClass}`);
    }

    await this.driver
      .findElement(By.className("booking__form"))
      .findElement(By.css(`label[for="vsb-${travelClassName}-class-train"]`))
      .click();
  }

  async addPassenger() {
    await this.driver
      .findElement(By.className("booking__form"))
      .findElement(By.className("vsb-inc-number--more"))
      .click();
  }

  async lessPassenger() {
    await this.driver
      .findElement(By.className("booking__form"))
      .findElement(By.className("vsb-inc-number--less"))
      .click();
  }

  async search() {
    await this.driver.findElement(By.id("vsb-booking-train-submit")).click();

    await this.driver.wait(until.urlContains("/proposition"));

    return new OuiProposalPage(this.driver);
  }

  async _selectHour(hourElement, hour) {
    await hourElement.click();
    await hourElement.findElement(By.css("select.booking__form-select")).then(selectOptionByValue(hour));
  }

  async _selectDayInCalendar(anyDate) {
    const date = parse(anyDate);
    const day = format(date, "D");

    await this.driver
      .wait(until.elementLocated(By.className("date-selector")))
      .findElements(By.css(".month-cal td.selectable_day"))
      .then(
        firstElementMatching(async element => {
          const text = await element.getText();
          return text === day;
        })
      )
      .then(element => element.click());
  }
}

class OuiProposalPage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForProposals() {
    await this.driver.wait(until.elementLocated(By.className("proposal-list")));
  }

  async getMoreProposals() {
    await this.driver.findElement(By.id("next-proposals")).click();
  }

  getPrices() {
    return this.driver.findElements(By.css(".proposal-list .price-proposal")).then(
      elementsMatching(async element => {
        const unavailableElements = await element.findElements(By.className("unavailable"));
        return unavailableElements.length === 0;
      })
    );
  }
}
