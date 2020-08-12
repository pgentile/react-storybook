import React from "react";
import { action } from "@storybook/addon-actions";

import CreditCardForm from "./CreditCardForm";
import sleep from "../utils/sleep";

const actions = {
  onPay: async (...args) => {
    await sleep(3000);
    action("submit")(...args);
  },
};

export default {
  title: "Payment / CreditCardForm",
  component: CreditCardForm,
};

export const main = () => {
  return <CreditCardForm {...actions} totalPrice={{ value: 98, currency: "EUR" }} />;
};
