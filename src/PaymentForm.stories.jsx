import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PaymentForm from "./PaymentForm";
import sleep from "./sleep";

const actions = {
  onPay: async (...args) => {
    await sleep(3000);
    action("submit")(args);
  }
};

storiesOf("Payment / PaymentForm", module).add("Défaut", () => {
  return <PaymentForm {...actions} price={{ value: 98, currency: "€" }} />;
});
