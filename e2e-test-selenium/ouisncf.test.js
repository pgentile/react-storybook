import { addDays, setHours, format, parse } from "date-fns";

import firstElementMatching from "./selenium/firstElementMatching";
import selectOptionByValue from "./selenium/selectOptionByValue";
import writeScreenshot from "./selenium/writeScreenshot";
import applyOnElements from "./selenium/applyOnElements";
import elementsMatching from "./selenium/elementsMatching";

jest.setTimeout(60 * 1000);

describe("OUI.sncf", () => {
  beforeEach(async () => {
    await driver.get("about:blank");
    await driver
      .manage()
      .window()
      .maximize();
  });

  afterEach(async () => {
    await driver.sleep(300);
    await writeScreenshot("screenshot.png");
    // await driver.close();
  });

  test.skip("Search on OUI.sncf", async () => {
    const homePage = await OuiHomePage.init();

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

  test.skip("Search on OUI.sncf 2", async () => {
    const homePage = await OuiHomePage.init();

    const today = new Date();
    const departureDate = setHours(addDays(today, 14), 7);

    await homePage.selectOrigin("Marseille");
    await homePage.selectDestination("Paris");
    await homePage.selectDepartureDate(departureDate);

    const proposalPage = await homePage.search();
    await proposalPage.waitForProposals();

    const prices = await proposalPage.getPrices().then(applyOnElements(element => element.getText()));
    prices.forEach(price => console.info("Price =", price));
  });

  test("Retry search station on OUI.sncf 2", async () => {
    const homePage = await OuiHomePage.init();

    const today = new Date();
    const departureDate = setHours(addDays(today, 14), 7);
    await homePage.selectDepartureDate(departureDate);

    await homePage.selectOrigin("Marseille");
    await homePage.selectDestination("Paris");
    await homePage.selectOrigin("Le Mans");

    const proposalPage = await homePage.search();
    await proposalPage.waitForProposals();

    await driver.navigate().back();

    await homePage.selectOrigin("Rennes");
    await homePage.selectOrigin("Lille");
  });
});

class OuiHomePage {
  static async init() {
    await driver.get("http://oui.sncf");
    const page = new OuiHomePage();
    await page.getRidOfAnnoyingPopins();
    return page;
  }

  async getRidOfAnnoyingPopins() {
    await this.getRidOfCookiePolicy();
    await this.getRidOfOuibot();
  }

  async getRidOfCookiePolicy() {
    await driver
      .wait(until.elementLocated(By.id("cookie-policy-popin")))
      .findElement(By.id("cookie-policy-close"))
      .click();
  }

  async getRidOfOuibot() {
    await driver
      .wait(until.elementLocated(By.className("ouibot-ancrage")))
      .findElement(By.className("ouibot-ancrage__close__close-icon"))
      .click();
  }

  async selectOrigin(origin) {
    const input = driver.findElement(By.id("vsb-origin-train"));
    await input.clear();
    await input.sendKeys(origin);

    await driver.wait(until.elementLocated(By.css("#d2d-autocomplete-origin-train .vsb-dropdown-new__item"))).click();
  }

  async selectDestination(origin) {
    const input = driver.findElement(By.id("vsb-destination-train"));
    await input.clear();
    await input.sendKeys(origin);

    await driver
      .wait(until.elementLocated(By.css("#d2d-autocomplete-destination-train .vsb-dropdown-new__item")))
      .click();
  }

  async selectDepartureDate(date) {
    await this.selectDepartureDay(date);
    await this.selectDepartureHour(date);
  }

  async selectDepartureDay(date) {
    await driver.findElement(By.id("vsb-departure-date-train")).click();
    await this._selectDayInCalendar(date);
  }

  async selectDepartureHour(anyDate) {
    const date = parse(anyDate);
    const hour = format(date, "H");

    const hourElement = driver.findElement(By.className("booking__form-outward-time"));
    await this._selectHour(hourElement, hour);
  }

  async setTravelDirect(travelDirect) {
    const bookingForm = driver.findElement(By.className("booking__form"));

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

    await driver
      .findElement(By.className("booking__form"))
      .findElement(By.css(`label[for="vsb-${travelClassName}-class-train"]`))
      .click();
  }

  async addPassenger() {
    await driver
      .findElement(By.className("booking__form"))
      .findElement(By.className("vsb-inc-number--more"))
      .click();
  }

  async lessPassenger() {
    await driver
      .findElement(By.className("booking__form"))
      .findElement(By.className("vsb-inc-number--less"))
      .click();
  }

  async search() {
    await driver.findElement(By.id("vsb-booking-train-submit")).click();

    await driver.wait(until.urlContains("/proposition"));

    return new OuiProposalPage(driver);
  }

  async _selectHour(hourElement, hour) {
    await hourElement.click();
    await hourElement.findElement(By.css("select.booking__form-select")).then(selectOptionByValue(hour));
  }

  async _selectDayInCalendar(anyDate) {
    const date = parse(anyDate);
    const day = format(date, "D");

    await driver
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
  async waitForProposals() {
    await driver.wait(until.elementLocated(By.className("proposal-list")));
  }

  async getMoreProposals() {
    await driver.findElement(By.id("next-proposals")).click();
  }

  getPrices() {
    return driver.findElements(By.css(".proposal-list .price-proposal")).then(
      elementsMatching(async element => {
        const unavailableElements = await element.findElements(By.className("unavailable"));
        return unavailableElements.length === 0;
      })
    );
  }
}
