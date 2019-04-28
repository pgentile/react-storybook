import fs from "fs";
import { promisify } from "util";
import { Buffer } from "buffer";

const writeFileAsync = promisify(fs.writeFile);

export default async function writeElementScreenshot(element, path) {
  const screenshotBase64Png = await element.takeScreenshot(true);
  const data = Buffer.from(screenshotBase64Png, "base64");

  await writeFileAsync(path, data);
}
