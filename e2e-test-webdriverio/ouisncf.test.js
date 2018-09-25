import { remote } from "webdriverio";

jest.setTimeout(30 * 1000);

const browsers = ["safari"];

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

    test("It should use Selenium", async () => {
      await client.url("https://oui.sncf");

      const title = await client.getTitle();
      expect(title.includes("OUI.sncf")).toBe(true);

      const originStationInputSelector = "#vsb-origin-train";
      await client.waitForVisible(originStationInputSelector);
      await client.$(originStationInputSelector).setValue("Rennes");

      const originStationSelector =
        "#d2d-autocomplete-origin-train .vsb-dropdown-new .vsb-dropdown-new__list .vsb-dropdown-new__item";
      await client.waitForVisible(originStationSelector);
      await client.click(originStationSelector);

      const destinationStationInputSelector = "#vsb-destination-train";
      await client.waitForVisible(destinationStationInputSelector);
      await client.$(destinationStationInputSelector).setValue("Paris");

      const destinationStationSelector =
        "#d2d-autocomplete-destination-train .vsb-dropdown-new .vsb-dropdown-new__list .vsb-dropdown-new__item";
      await client.waitForVisible(destinationStationSelector);
      await client.click(destinationStationSelector);

      await client.click("#vsb-booking-train-submit");

      await client.waitUntil(
        async () => {
          const url = await client.getUrl();
          return url.includes("/proposition");
        },
        5000,
        "Can't get to proposal page"
      );

      await client.saveScreenshot("./screenshot.png");
    });
  });
});
