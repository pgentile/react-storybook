import writeScreenshot from "./selenium/writeScreenshot";

jest.setTimeout(60 * 1000);

describe("Mock page", () => {
  beforeEach(async () => {
    /*
    await driver
      .manage()
      .window()
      .maximize();
    */
  });

  afterEach(async () => {
    await driver.sleep(300);
    await writeScreenshot("screenshot.png");
    await driver.close();
  });

  test("It should get the list", async () => {
    await driver.get("http://localhost:10101/list.html");

    const listItems = await driver.findElements(By.css(".list li"));
    const itemTexts = await Promise.all(listItems.map(listItem => listItem.getText()));
    console.info("itemTexts =", itemTexts);
  });
});
