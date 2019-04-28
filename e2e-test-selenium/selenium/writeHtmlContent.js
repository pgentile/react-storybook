import fs from "fs";
import { promisify } from "util";
import pretty from "pretty";

const writeFileAsync = promisify(fs.writeFile);

export default async function writeHtmlContent(path) {
  const html = await driver.executeScript("return document.documentElement.outerHTML");
  const prettyHtml = pretty(html);

  await writeFileAsync(path, prettyHtml);
}
