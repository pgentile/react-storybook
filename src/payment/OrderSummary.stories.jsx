import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import OrderSummary from "./OrderSummary";
import { TICKET_TYPE, INSURANCE_TYPE, DONATION_TYPE, VOUCHER_TYPE } from "../redux/reducers/order";

const cancelVoucher = action("cancel voucher");
const cancelInsurance = action("cancel insurance");
const cancelDonation = action("cancel donation");

const ticketItem = {
  id: "billets",
  type: TICKET_TYPE,
  label: "Vos billets",
  price: {
    value: 109.8,
    currency: "EUR"
  }
};

const insuranceItem = {
  id: "assurances",
  type: INSURANCE_TYPE,
  label: "Vos assurances",
  price: {
    value: 5.9,
    currency: "EUR"
  },
  onCancel: cancelInsurance
};

const voucherItem = {
  id: "voucher",
  type: VOUCHER_TYPE,
  label: "Votre code promotion",
  price: {
    value: -2.0,
    currency: "EUR"
  },
  onCancel: cancelVoucher
};

const donationItem = {
  id: "donation",
  type: DONATION_TYPE,
  label: "Votre don",
  price: {
    value: 1.0,
    currency: "EUR"
  },
  donationDetails: {
    code: "code",
    association: "Médecins sans frontières"
  },
  onCancel: cancelDonation
};

const totalPrice = {
  value: 123,
  currency: "EUR"
};

storiesOf("Payment / OrderSummary", module)
  .add("Billets uniquement", () => {
    return <OrderSummary items={[ticketItem]} totalPrice={totalPrice} />;
  })
  .add("Billets & assurances", () => {
    return <OrderSummary items={[ticketItem, insuranceItem]} totalPrice={totalPrice} />;
  })
  .add("Avec un code promo", () => {
    return <OrderSummary items={[ticketItem, voucherItem, insuranceItem]} totalPrice={totalPrice} />;
  })
  .add("Avec un don", () => {
    return <OrderSummary items={[ticketItem, donationItem]} totalPrice={totalPrice} />;
  })
  .add("Tous les types", () => {
    return <OrderSummary items={[ticketItem, voucherItem, insuranceItem, donationItem]} totalPrice={totalPrice} />;
  });
