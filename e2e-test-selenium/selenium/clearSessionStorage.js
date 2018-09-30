export default async function clearLocalStorage() {
  await driver.executeScript("window.sessionStorage.clear();");
}
