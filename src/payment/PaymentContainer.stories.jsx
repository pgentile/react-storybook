import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PaymentContainer from "./PaymentContainer";
import { TICKET_TYPE, INSURANCE_TYPE } from "../redux/reducers/payment";

const items = [
  {
    id: "billets",
    type: TICKET_TYPE,
    label: "Vos billets",
    price: {
      value: 109.8,
      currency: "€"
    }
  },
  {
    id: "assurances",
    type: INSURANCE_TYPE,
    label: "Vos assurances",
    price: {
      value: 5.9,
      currency: "€"
    }
  }
];

const totalPrice = {
  value: 123,
  currency: "€"
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

storiesOf("Payment / PaymentContainer", module).add("main", () => {
  return (
    <PaymentContainer
      items={items}
      totalPrice={totalPrice}
      registredCards={registredCards}
      onAddVoucher={action("add voucher")}
      onCancelVoucher={action("cancel voucher")}
      onAddInsurance={action("add insurance")}
      onCancelInsurance={action("cancel insurance")}
      onAddDonation={action("add donation")}
      onCancelDonation={action("cancel donation")}
      onPay={action("pay")}
    />
  );
});
