import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCardList from "./RegistredCreditCardList";

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
  },
  {
    id: "3",
    brand: "american-express",
    maskedNumber: "#### ###### #3342",
    expirationDate: "2029-01"
  },
  {
    id: "4",
    brand: "maestro",
    maskedNumber: "#### #### #### 1111",
    expirationDate: "2028-01"
  }
];

const totalPrice = {
  value: 100,
  currency: "€"
};

storiesOf("Payment / RegistredCreditCardList", module)
  .add("main", () => {
    return <RegistredCreditCardList totalPrice={totalPrice} cards={cards} onUseCard={action("use card")} />;
  })
  .add("just one card", () => {
    return <RegistredCreditCardList totalPrice={totalPrice} cards={cards.slice(0, 1)} onUseCard={action("use card")} />;
  })
  .add("disabled", () => {
    return <RegistredCreditCardList totalPrice={totalPrice} cards={cards} disabled onUseCard={action("use card")} />;
  });
