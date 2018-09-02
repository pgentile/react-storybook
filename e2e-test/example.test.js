import puppeteer from "puppeteer";

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
    await page.waitForNavigation();

    const resultTitle = await page.title();
    expect(resultTitle.includes(searchTerms)).toBeTruthy();
  });
});
