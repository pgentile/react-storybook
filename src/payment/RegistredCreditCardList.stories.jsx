import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCardList from "./RegistredCreditCardList";

storiesOf("Payment / RegistredCreditCardList", module).add("main", () => {
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
  return <RegistredCreditCardList cards={cards} onUseCard={action("use card")} />;
});
