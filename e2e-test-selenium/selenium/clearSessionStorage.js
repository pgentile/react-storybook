export default async function clearSessionStorage() {
  await driver.executeScript("window.sessionStorage.clear();");
}
