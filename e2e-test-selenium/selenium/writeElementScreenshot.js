const fs = require("fs");
const { promisify } = require("util");
const { Buffer } = require("buffer");

const writeFileAsync = promisify(fs.writeFile);

async function writeElementScreenshot(element, path) {
  const screenshotBase64Png = await element.takeScreenshot(true);
  const data = Buffer.from(screenshotBase64Png, "base64");

  await writeFileAsync(path, data);
}

module.exports = writeElementScreenshot;
