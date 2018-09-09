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

storiesOf("Payment / PaymentContainer", module).add("main", () => {
  return (
    <PaymentContainer
      items={items}
      totalPrice={totalPrice}
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
