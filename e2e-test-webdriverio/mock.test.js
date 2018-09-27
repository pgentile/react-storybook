import { remote } from "webdriverio";

jest.setTimeout(60 * 1000);

const browsers = ["chrome"];

browsers.forEach(browser => {
  describe(`Browser ${browser}`, () => {
    let client = remote({
      desiredCapabilities: {
        browserName: browser,
        cleanSession: true
      },
      waitforTimeout: 20 * 1000,
      waitforInterval: 500,
      logLevel: "verbose"
    });

    client.addCommand("mapElements", async function(selector, mapper) {
      const elements = await this.elements(selector);
      const mappedPromises = elements.value.map(async element => {
        const elementClient = this.elementIdElement(element.ELEMENT, ".");
        return mapper(elementClient);
      });
      return Promise.all(mappedPromises);
    });

    beforeAll(async () => {
      await client.init();

      await client.timeouts({
        script: 5 * 1000,
        pageLoad: 10 * 1000,
        implicit: 10 * 1000
      });

      /*
      await client.windowHandlePosition({
        x: 0,
        y: 0
      });

      await client.setViewportSize({
        width: 1200,
        height: 1000
      });
      */
    });

    afterAll(async () => {
      await client.end();
    });

    afterAll(async () => {
      await client.saveScreenshot("./screenshot.png");
    });

    test("It should use Selenium", async () => {
      await client.url("http://localhost:10101/list.html");

      const title = await client.getTitle();
      expect(title.includes("Sample list")).toBe(true);

      const titles = await client.mapElements(".list li", elem => {
        return elem.getTitle();
      });

      titles.forEach(title => {
        console.info("title =", title);
      });
    });
  });
});
