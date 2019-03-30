import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CreditCardForm from "./CreditCardForm";
import sleep from "../utils/sleep";

const actions = {
  onPay: async (...args) => {
    await sleep(3000);
    action("submit")(...args);
  }
};

storiesOf("Payment / CreditCardForm", module).add("Défaut", () => {
  return <CreditCardForm {...actions} totalPrice={{ value: 98, currency: "EUR" }} />;
});
