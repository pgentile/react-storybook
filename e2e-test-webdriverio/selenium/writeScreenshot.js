const fs = require("fs");
const { promisify } = require("util");
const { Buffer } = require("buffer");

const writeFileAsync = promisify(fs.writeFile);

async function writeScreenshot(driver, path) {
  const screenshotBase64Png = await driver.takeScreenshot();
  const data = Buffer.from(screenshotBase64Png, "base64");

  await writeFileAsync(path, data);
}

module.exports = writeScreenshot;
