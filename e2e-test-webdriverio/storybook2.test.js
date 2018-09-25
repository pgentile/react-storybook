import { remote } from "webdriverio";
import querystring from "query-string";

jest.setTimeout(30 * 1000);

// firefox doesn't work...
const browsers = ["safari", "chrome"];

browsers.forEach(browser => {
  describe(`Browser ${browser}`, () => {
    const options = { desiredCapabilities: { browserName: browser, cleanSession: true } };
    const client = remote(options);

    beforeAll(async () => {
      await client.init();

      client.timeouts({
        script: 5 * 1000,
        pageLoad: 10 * 1000,
        implicit: 10 * 1000
      });
    });

    afterAll(async () => {
      await client.end();
    });

    beforeEach(async () => {
      client.windowHandlePosition({
        x: 0,
        y: 0
      });

      client.setViewportSize({
        width: 1200,
        height: 1000
      });
    });

    describe("DateInput", () => {
      test("It should fill date input", async () => {
        await client.url(getStoryUrl("Forms / DateInput", "dynamic"));

        await client.setValue(".form-date-input__input--day", "22");

        await expect(client.hasFocus(".form-date-input__input--month")).resolves.toBe(true);
        await client.setValue(".form-date-input__input--month", "04");

        await expect(client.hasFocus(".form-date-input__input--year")).resolves.toBe(true);
        await client.setValue(".form-date-input__input--year", "1985");

        await client.saveScreenshot("./screenshot.png");
      });
    });

    describe("Toggle", () => {
      test("It should toggle", async () => {
        await client.url(getStoryUrl("Forms / Toggle", "demo"));

        await expect(client.getAttribute(".toggle .toggle__input", "checked")).resolves.toBeFalsy();

        await client.click(".toggle");

        await expect(client.getAttribute(".toggle .toggle__input", "checked")).resolves.toBeTruthy();
      });
    });

    describe("ExpandableCard", () => {
      test("It should expand card", async () => {
        await client.url(getStoryUrl("ExpandableCard", "main"));

        await expect(client.isVisible(".expandable-card__expandable")).resolves.toBe(false);

        await client.click("a=En savoir plus");

        await client.waitForVisible(".expandable-card__expandable");
      });
    });
  });
});

function getStoryUrl(selectedKind, selectedStory) {
  const q = querystring.stringify({
    selectedKind,
    selectedStory
  });
  return `http://localhost:6006/iframe.html?${q}`;
}
