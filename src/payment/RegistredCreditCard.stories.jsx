import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCreditCard from "./RegistredCreditCard";

const actions = {
  onShowCvv: action("show CVV"),
  onHideCvv: action("hide CVV"),
  onUseCard: action("use card")
};

const totalPrice = {
  value: 100,
  currency: "€"
};

const cardBrands = ["visa", "maestro"];

const stories = storiesOf("Payment / RegistredCreditCard", module);

cardBrands.forEach(cardBrand => {
  const props = {
    ...actions,
    totalPrice,
    card: {
      id: "1",
      brand: cardBrand,
      maskedNumber: "#### #### #### 111#",
      expirationDate: "2031-01"
    }
  };

  stories.add(cardBrand, () => {
    return <RegistredCreditCard {...props} />;
  });

  stories.add(cardBrand + " / visible CVV", () => {
    return <RegistredCreditCard {...props} showCvv />;
  });

  stories.add(cardBrand + " / disabled", () => {
    return <RegistredCreditCard {...props} disabled />;
  });

  stories.add(cardBrand + " / visible CVV / disabled", () => {
    return <RegistredCreditCard {...props} showCvv disabled />;
  });
});
