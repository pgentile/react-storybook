import React from "react";
import { mount } from "enzyme";

import RegistredCreditCardList from "./RegistredCreditCardList";
import RegistredCreditCard from "./RegistredCreditCard";
import RegistredCardCvvForm from "./RegistredCardCvvForm";

describe(RegistredCreditCardList.name, () => {
  const cards = [
    {
      id: "1",
      brand: "visa",
      maskedNumber: "#### #### #### 1111",
      expirationDate: "2031-01"
    },
    {
      id: "2",
      brand: "mastercard",
      maskedNumber: "#### #### #### 1113",
      expirationDate: "2029-01"
    }
  ];

  const totalPrice = {
    value: 100,
    currency: "€"
  };

  let wrapper;

  const findRegistredCardById = id => {
    return wrapper.find(RegistredCreditCard).filterWhere(registredCard => registredCard.prop("card").id === id);
  };

  const clickOnUseCard = id => {
    findRegistredCardById(id)
      .find(".registred-credit-card__select button")
      .simulate("click");
  };

  const assertThatCardCvvIsVisible = id => {
    const registredCards = wrapper.find(RegistredCreditCard);

    const registredCard = registredCards.filterWhere(someRegistredCard => someRegistredCard.prop("card").id === id);
    expect(registredCard.prop("showCvv")).toBe(true);

    registredCards
      .filterWhere(someRegistredCard => someRegistredCard.instance() !== registredCard.instance())
      .forEach(otherRegistredCard => {
        expect(otherRegistredCard.prop("showCvv")).toBe(false);
      });
  };

  const assertThatNoCardCvvIsVisible = () => {
    wrapper.find(RegistredCreditCard).forEach(registredCard => {
      expect(registredCard.prop("showCvv")).toBe(false);
    });
  };

  test("Select and display just one credit card", () => {
    const onUseCard = jest.fn();
    wrapper = mount(<RegistredCreditCardList totalPrice={totalPrice} cards={cards} onUseCard={onUseCard} />);

    assertThatNoCardCvvIsVisible();

    clickOnUseCard("2");
    assertThatCardCvvIsVisible("2");

    clickOnUseCard("1");
    assertThatCardCvvIsVisible("1");

    clickOnUseCard("1");
    assertThatNoCardCvvIsVisible();
  });

  // Can't use the submit event on form...
  xtest("Use some card", () => {
    const onUseCard = jest.fn();
    wrapper = mount(<RegistredCreditCardList totalPrice={totalPrice} cards={cards} onUseCard={onUseCard} />);

    const cardId = "2";

    clickOnUseCard(cardId);
    assertThatCardCvvIsVisible(cardId);

    const registredCard = findRegistredCardById(cardId);
    const cvv = "123";

    const form = registredCard.find(RegistredCardCvvForm).find("form");

    form.find("input[name='cvv']").simulate("change", {
      target: {
        name: "cvv",
        value: cvv
      }
    });

    form.simulate("submit");

    console.debug("CARDS:", form.debug());

    expect(onUseCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: cardId,
        cvv
      })
    );
  });
});
