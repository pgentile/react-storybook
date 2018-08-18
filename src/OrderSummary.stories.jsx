import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import OrderSummary from "./OrderSummary";
import { TICKET_TYPE, INSURANCE_TYPE, DONATION_TYPE, VOUCHER_TYPE } from "./redux/reducers/payment";

const cancelVoucher = action("cancel voucher");
const cancelDonation = action("cancel donation");

const billetsItem = {
  id: "billets",
  type: TICKET_TYPE,
  label: "Vos billets",
  price: {
    value: 109.8,
    currency: "€"
  }
};

const assurancesItem = {
  id: "assurances",
  type: INSURANCE_TYPE,
  label: "Vos assurances",
  price: {
    value: 5.9,
    currency: "€"
  }
};

const voucherItem = {
  id: "voucher",
  type: VOUCHER_TYPE,
  label: "Votre code promotion",
  price: {
    value: -2.0,
    currency: "€"
  },
  onCancel: cancelVoucher
};

const donationItem = {
  id: "donation",
  type: DONATION_TYPE,
  label: "Votre don",
  price: {
    value: 1.0,
    currency: "€"
  },
  donationDetails: {
    code: "code",
    association: "Médecins sans frontières"
  },
  onCancel: cancelDonation
};

storiesOf("Payment / OrderSummary", module)
  .add("Billets uniquement", () => {
    return <OrderSummary items={[billetsItem]} />;
  })
  .add("Billets & assurances", () => {
    return <OrderSummary items={[billetsItem, assurancesItem]} />;
  })
  .add("Avec un code promo", () => {
    return <OrderSummary items={[billetsItem, voucherItem, assurancesItem]} />;
  })
  .add("Avec un don", () => {
    return <OrderSummary items={[billetsItem, donationItem]} />;
  })
  .add("Tous les types", () => {
    return <OrderSummary items={[billetsItem, voucherItem, assurancesItem, donationItem]} />;
  });
