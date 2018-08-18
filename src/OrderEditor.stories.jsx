import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import OrderEditor from "./OrderEditor";
import { TICKET_TYPE, INSURANCE_TYPE, DONATION_TYPE, VOUCHER_TYPE } from "./redux/reducers/payment";

const cancelVoucher = action("cancel voucher");
const cancelDonation = action("cancel donation");
const cancelInsurance = action("cancel insurance");

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
  code: "RADIN",
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
  code: "code",
  association: "Médecins sans frontières",
  onCancel: cancelDonation
};

const onActions = {
  onAddVoucher: action("add voucher"),
  onCancelVoucher: cancelVoucher,
  onAddInsurance: action("add insurance"),
  onCancelInsurance: cancelInsurance,
  onAddDonation: action("add donation"),
  onCancelDonation: cancelDonation
};

storiesOf("Payment / OrderEditor", module)
  .add("Billets uniquement", () => {
    return <OrderEditor items={[billetsItem]} {...onActions} />;
  })
  .add("Billets & assurances", () => {
    return <OrderEditor items={[billetsItem, assurancesItem]} {...onActions} />;
  })
  .add("Avec un code promo", () => {
    return <OrderEditor items={[billetsItem, voucherItem, assurancesItem]} {...onActions} />;
  })
  .add("Avec un don", () => {
    return <OrderEditor items={[billetsItem, donationItem]} {...onActions} />;
  });
