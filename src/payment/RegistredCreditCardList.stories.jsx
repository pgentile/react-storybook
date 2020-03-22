import React from "react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCardList from "./RegistredCreditCardList";

const cards = [
  {
    id: "1",
    brand: "visa",
    maskedNumber: "#### #### #### 1111",
    expirationDate: "2031-01",
  },
  {
    id: "2",
    brand: "mastercard",
    maskedNumber: "#### #### #### 1113",
    expirationDate: "2029-01",
  },
  {
    id: "3",
    brand: "american-express",
    maskedNumber: "#### ###### #3342",
    expirationDate: "2029-01",
  },
  {
    id: "4",
    brand: "maestro",
    maskedNumber: "#### #### #### 1111",
    expirationDate: "2028-01",
  },
];

const totalPrice = {
  value: 100,
  currency: "EUR",
};

export default {
  title: "Payment | RegistredCreditCardList",
  component: RegistredCreditCardList,
};

export const main = () => {
  return <RegistredCreditCardList totalPrice={totalPrice} cards={cards} onUseCard={action("use card")} />;
};

export const disabledStory = () => {
  return <RegistredCreditCardList totalPrice={totalPrice} cards={cards} disabled onUseCard={action("use card")} />;
};
