import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCard from "./RegistredCreditCard";

storiesOf("Payment / RegistredCreditCard", module)
  .add("Visa", () => {
    return (
      <RegistredCreditCard
        cardId="1"
        brand="visa"
        maskedNumber="4### #### #### 111#"
        expirationDate="2031-01"
        onUseCard={action("use card")}
      />
    );
  })
  .add("Mastercard", () => {
    return (
      <RegistredCreditCard
        cardId="2"
        brand="mastercard"
        maskedNumber="5### #### #### 111#"
        expirationDate="2031-01"
        onUseCard={action("use card")}
      />
    );
  });
