import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCardCvvForm from "./RegistredCardCvvForm";

const actions = {
  onUseCard: action("use card"),
  onCancel: action("hide CVV"),
};

const totalPrice = {
  value: 100,
  currency: "EUR",
};

const stories = storiesOf("Payment | RegistredCardCvvForm", module);

["visa", "mastercard", "american-express", "maestro"].forEach((brand) => {
  stories.add(brand, () => {
    return <RegistredCardCvvForm brand={brand} totalPrice={totalPrice} {...actions} />;
  });
});

stories.add("disabled", () => {
  return <RegistredCardCvvForm brand="visa" totalPrice={totalPrice} {...actions} disabled />;
});
