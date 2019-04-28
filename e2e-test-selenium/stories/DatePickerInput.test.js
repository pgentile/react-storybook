import getStoryUrl from "./getStoryUrl";
import writeElementScreenshot from "../selenium/writeElementScreenshot";

describe("DatePickerInput", () => {
  it("should display the calendar on click", async () => {
    await driver.get(getStoryUrl("Forms / DatePickerInput", "demo"));

    const input = await driver.wait(until.elementLocated(By.className("date-picker-input")));
    const field = await input.findElement(By.className("date-picker-input__field"));
    const datePickerPanel = await input.findElement(By.className("date-picker-input__picker-panel"));

    await field.click();

    await driver.wait(until.elementIsVisible(datePickerPanel));

    await writeElementScreenshot(input, "./screenshot-1-1.png");
    await writeElementScreenshot(datePickerPanel, "./screenshot-1-2.png");

    const someDay = await datePickerPanel.findElement(
      By.css(".calendar__day--selectable.calendar__day--current-month:not(.calendar__day--selected)")
    );
    await someDay.click();

    await driver.wait(until.elementIsNotVisible(datePickerPanel));

    await writeElementScreenshot(input, "./screenshot-2.png");
  });
});
