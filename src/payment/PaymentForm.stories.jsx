import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PaymentForm from "./PaymentForm";
import sleep from "../utils/sleep";

const actions = {
  onPay: async (...args) => {
    await sleep(3000);
    action("submit")(...args);
  }
};

const registredCards = [
  {
    id: "1",
    brand: "visa",
    maskedNumber: "#### #### #### 1111",
    expirationDate: "2031-07"
  },
  {
    id: "2",
    brand: "mastercard",
    maskedNumber: "#### #### #### 1113",
    expirationDate: "2029-01"
  },
  {
    id: "3",
    brand: "maestro",
    maskedNumber: "#### #### #### 1113",
    expirationDate: "2029-01"
  }
];

storiesOf("Payment / PaymentForm", module).add("Défaut", () => {
  return <PaymentForm {...actions} registredCards={registredCards} totalPrice={{ value: 98, currency: "€" }} />;
});
