const fs = require("fs");
const { promisify } = require("util");
const pretty = require("pretty");

const writeFileAsync = promisify(fs.writeFile);

async function writeHtmlContent(path) {
  const html = await driver.executeScript("return document.documentElement.outerHTML");
  const prettyHtml = pretty(html);

  await writeFileAsync(path, prettyHtml);
}

module.exports = writeHtmlContent;
