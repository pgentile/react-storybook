import { remote } from "webdriverio";

jest.setTimeout(30 * 1000);

const browsers = ["safari", "firefox", "chrome"];

describe("Test WebdriverIO", () => {
  browsers.forEach(browser => {
    describe(`Browser ${browser}`, () => {
      const options = { desiredCapabilities: { browserName: browser, cleanSession: true } };
      const client = remote(options);

      beforeAll(async () => {
        await client.init();
      });

      afterAll(async () => {
        await client.end();
      });

      beforeEach(async () => {
        await client.reload();
      });

      test("It should use Selenium", async () => {
        await client.url("https://google.fr");

        const title = await client.getTitle();
        expect(title).toEqual("Google");

        const searchTerms = "jambon";

        await client.$("input[name=q]").setValue(searchTerms);

        await client.waitForVisible(".gstl_0.sbdd_a");

        await client.$('input[value="Recherche Google"]').click();
      });
    });
  });
});
