/* eslint-env node */

const path = require("path");
const fs = require("fs");

var recursive = require("recursive-readdir");

const inputDir = path.join(__dirname, "../build/messages/src");
const targetDir = path.join(__dirname, "../build/translations");

async function generateTranslations() {
  const files = await recursive(inputDir);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  const allTranslations = {};

  for (const jsonFile of jsonFiles) {
    console.info("Src file:", jsonFile);
    const translations = await readJsonFile(jsonFile);
    translations.forEach((translation) => {
      allTranslations[translation.id] = translation.defaultMessage.trim();
    });
  }

  const targetFile = path.join(targetDir, "fr.json");
  console.info("Target file:", targetFile);
  await writeJsonFile(targetFile, allTranslations);
}

async function readJsonFile(file) {
  const content = await fs.promises.readFile(file, "utf-8");
  return JSON.parse(content);
}

async function writeJsonFile(file, content) {
  await fs.promises.mkdir(path.dirname(file), { recursive: true });

  const outputData = JSON.stringify(content, undefined, 2);
  await fs.promises.writeFile(file, outputData, "utf-8");
}

generateTranslations().catch((e) => {
  console.error("Failure:", e);
  process.exit(1);
});
