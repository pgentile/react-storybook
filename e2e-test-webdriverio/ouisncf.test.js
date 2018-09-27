import { remote } from "webdriverio";

jest.setTimeout(60 * 1000);

const browsers = ["chrome"];

browsers.forEach(browser => {
  describe(`Browser ${browser}`, () => {
    let client = remote({
      desiredCapabilities: {
        browserName: browser,
        cleanSession: true
      },
      waitforTimeout: 20 * 1000,
      waitforInterval: 500
    });

    client.addCommand("mapElements", async function(selector, mapper) {
      const elements = await this.elements(selector);
      const mappedPromises = elements.value.map(async element => {
        const elementClient = this.elementIdElement(element.ELEMENT, ".");
        return mapper(elementClient);
      });
      return Promise.all(mappedPromises);
    });

    beforeAll(async () => {
      await client.init();

      await client.timeouts({
        script: 5 * 1000,
        pageLoad: 10 * 1000,
        implicit: 10 * 1000
      });

      /*
      await client.windowHandlePosition({
        x: 0,
        y: 0
      });

      await client.setViewportSize({
        width: 1200,
        height: 1000
      });
      */
    });

    afterAll(async () => {
      await client.end();
    });

    afterAll(async () => {
      await client.saveScreenshot("./screenshot.png");
    });

    test("It should use Selenium", async () => {
      await client.url("https://oui.sncf");

      const title = await client.getTitle();
      expect(title.includes("OUI.sncf")).toBe(true);

      const homePage = new OuiHomePage(client);
      await homePage.getRidOfCookiePolicy();
      await homePage.getRidOfOuibot();

      const proposalPage = await homePage.search({
        origin: "Rennes",
        destination: "Paris"
      });

      await proposalPage.getRidOfAbPopin();

      const firstProposal = proposalPage.getFirstProposal();
      await firstProposal.selectFirstPrice();
      await firstProposal.validateProposal();
    });
  });
});

class PageObject {
  constructor(client) {
    this.client = client;
  }

  async getRidOfCookiePolicy() {
    await this.client.waitForVisible("#cookie-policy-popin").click("#cookie-policy-close");
  }
}

class OuiHomePage extends PageObject {
  selectors = {
    originSearch: "#vsb-origin-train",
    originProposal: "#d2d-autocomplete-origin-train .vsb-dropdown-new__item",
    destinationSearch: "#vsb-destination-train",
    destinationProposal: "#d2d-autocomplete-destination-train .vsb-dropdown-new__item",
    searchButton: "#vsb-booking-train-submit",
    ouibot: ".ouibot-ancrage",
    ouibotCloseButton: ".ouibot-ancrage__close__close-icon"
  };

  async search({ origin, destination }) {
    await this.client
      .waitForExist(this.selectors.originSearch)
      .setValue(this.selectors.originSearch, origin)
      .waitForVisible(this.selectors.originProposal)
      .click(this.selectors.originProposal);

    await this.client
      .waitForExist(this.selectors.destinationSearch)
      .setValue(this.selectors.destinationSearch, destination)
      .waitForVisible(this.selectors.destinationProposal)
      .click(this.selectors.destinationProposal);

    await this.client.click(this.selectors.searchButton);

    await this.client.waitUntil(async () => {
      const url = await this.client.getUrl();
      return url.includes("/proposition");
    });

    return new OuiProposalsPage(this.client);
  }

  async getRidOfOuibot() {
    await this.client.waitForVisible(this.selectors.ouibot).click(this.selectors.ouibotCloseButton);
  }
}

class OuiProposalsPage extends PageObject {
  selectors = {
    ab: {
      popin: "#ab_popin",
      closeButton: "#ab_close"
    },
    proposals: ".proposal-list .proposals .proposal"
  };

  async getRidOfAbPopin() {
    try {
      await this.client.waitForVisible(this.selectors.ab.popin, 5000);
    } catch (e) {
      console.debug("No AB popin found", e);
    }
    await this.client.click(this.selectors.ab.closeButton);
  }

  async getProposals() {
    return this.client.waitForVisible(this.selectors.proposals).mapElements(this.selectors.proposals, element => {
      return new OuiProposal(element);
    });
  }

  getFirstProposal() {
    return new OuiProposal(this.client.$(this.selectors.proposals));
  }
}

class OuiProposal extends PageObject {
  async getTitle() {
    return this.client.$(".proposalSummary .proposal-info").getText();
  }

  async getPrices() {
    return this.client.mapElements(".price-proposal", element => new OuiPrice(element));
  }

  async selectFirstPrice() {
    await this.client.scroll(".price-proposal .price-btn").click(".price-proposal .price-btn");
  }

  async validateProposal() {
    await this.client
      .waitForExist(".proposal-details .details-actions .btn-validate button")
      .scroll(".proposal-details .details-actions .btn-validate button")
      .click(".proposal-details .details-actions .btn-validate button");

    await this.client.waitUntil(async () => {
      const url = await this.client.getUrl();
      return url.includes("/panier") || url.includes("/cart") || url.includes("/basket");
    });

    return new OuiBasketPage(this.client);
  }
}

class OuiPrice extends PageObject {
  async getPriceValue() {
    return this.client.$(".price-btn .complex-price price").getText();
  }

  async select() {
    await this.client.$(".price-btn").click();
    return new OuiBasketPage(this.client);
  }
}

class OuiBasketPage extends PageObject {}
