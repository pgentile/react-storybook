import fs from "fs";
import { promisify } from "util";
import { Buffer } from "buffer";

const writeFileAsync = promisify(fs.writeFile);

export default async function writeScreenshot(path) {
  const screenshotBase64Png = await driver.takeScreenshot();
  const data = Buffer.from(screenshotBase64Png, "base64");

  await writeFileAsync(path, data);
}
