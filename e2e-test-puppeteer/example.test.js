import puppeteer from "puppeteer";

jest.setTimeout(30 * 1000);

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
});

afterAll(() => {
  browser.close();
});

describe("Test Puppeteer", () => {
  it("should go to Google home page", async () => {
    const page = await browser.newPage();
    await page.goto("https://google.fr");

    const title = await page.title();
    expect(title).toEqual("Google");

    const searchTerms = "jambon";

    await page.waitForSelector("input[name=q]");
    await page.click("input[name=q]");
    await page.type("input[name=q]", searchTerms);
    await page.click('input[value="Recherche Google"]');

    const resultTitle = await page.title();
    expect(resultTitle).toInclude(searchTerms);
  });
});
