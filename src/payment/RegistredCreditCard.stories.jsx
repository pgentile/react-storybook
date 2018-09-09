import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCard from "./RegistredCreditCard";

const actions = {
  onShowCvv: action("show CVV"),
  onHideCvv: action("hide CVV"),
  onUseCard: action("use card")
};

storiesOf("Payment / RegistredCreditCard", module)
  .add("Visa", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "visa",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        {...actions}
      />
    );
  })
  .add("Visible CVV", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "visa",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        showCvv
        {...actions}
      />
    );
  })
  .add("disabled", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "visa",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        disabled
        {...actions}
      />
    );
  })
  .add("Visible CVV and disabled", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "visa",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        showCvv
        disabled
        {...actions}
      />
    );
  })
  .add("Mastercard", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "mastercard",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        {...actions}
      />
    );
  })
  .add("Maestro", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "maestro",
          maskedNumber: "#### #### #### 111#",
          expirationDate: "2031-01"
        }}
        {...actions}
      />
    );
  })
  .add("American Express", () => {
    return (
      <RegistredCreditCard
        card={{
          id: "1",
          brand: "american-express",
          maskedNumber: "#### ###### #3342",
          expirationDate: "2031-01"
        }}
        {...actions}
      />
    );
  });
