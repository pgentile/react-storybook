import getStoryUrl from "./getStoryUrl";

describe("List stories", () => {
  it("should list stories from browser", async () => {
    // Open the storybook preview page
    await driver.get(getStoryUrl(undefined, undefined));

    const stories = await driver.executeScript(() => {
      // On peut y accéder, cette fonction sera exécutée côté browser
      // eslint-disable-next-line no-undef
      return __STORYBOOK_CLIENT_API__.getStorybook();
    });
    console.info("stories =", stories);
  });
});
