export default async function clearLocalStorage() {
  await driver.executeScript("window.localStorage.clear();");
}
