import getStoryUrl from "./getStoryUrl";
import writeScreenshot from "../selenium/writeScreenshot";

describe("NumberInput", () => {
  afterEach(async () => {
    await driver.sleep(300);
    await writeScreenshot("screenshot.png");
    // await driver.close();
  });

  it("should accept only digits", async () => {
    await driver.get(getStoryUrl("Forms / NumberInput", "main"));

    const input = await driver.findElement(By.css("input"));

    await input.sendKeys("12345");

    const inputValue = await input.getAttribute("value");
    expect(inputValue).toEqual("12345");

    await input.sendKeys("abcd 6789");

    const newInputValue = await input.getAttribute("value");
    expect(newInputValue).toEqual("123456789");

    await input.clear();

    const cleanedInputValue = await input.getAttribute("value");
    expect(cleanedInputValue).toEqual("");
  });
});
