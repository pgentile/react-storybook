import React from "react";
import { action } from "@storybook/addon-actions";

import OrderEditor from "./OrderEditor";
import { TICKET_TYPE, INSURANCE_TYPE, DONATION_TYPE, VOUCHER_TYPE } from "../redux/reducers/order";

const cancelVoucher = action("cancel voucher");
const cancelDonation = action("cancel donation");
const cancelInsurance = action("cancel insurance");

const billetsItem = {
  id: "billets",
  type: TICKET_TYPE,
  label: "Vos billets",
  price: {
    value: 109.8,
    currency: "EUR"
  }
};

const assurancesItem = {
  id: "assurances",
  type: INSURANCE_TYPE,
  label: "Vos assurances",
  price: {
    value: 5.9,
    currency: "EUR"
  }
};

const voucherItem = {
  id: "voucher",
  type: VOUCHER_TYPE,
  label: "Votre code promotion",
  price: {
    value: -2.0,
    currency: "EUR"
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
    currency: "EUR"
  },
  code: "code",
  association: "Médecins sans frontières",
  onCancel: cancelDonation
};

const totalPrice = {
  value: 123,
  currency: "EUR"
};

const onActions = {
  onAddVoucher: action("add voucher"),
  onCancelVoucher: cancelVoucher,
  onAddInsurance: action("add insurance"),
  onCancelInsurance: cancelInsurance,
  onAddDonation: action("add donation"),
  onCancelDonation: cancelDonation
};

export default {
  title: "Payment | OrderEditor"
};

export const billetsUniquement = () => {
  return <OrderEditor items={[billetsItem]} totalPrice={totalPrice} {...onActions} />;
};

billetsUniquement.story = {
  name: "Billets uniquement"
};

export const billetsAssurances = () => {
  return <OrderEditor items={[billetsItem, assurancesItem]} totalPrice={totalPrice} {...onActions} />;
};

billetsAssurances.story = {
  name: "Billets & assurances"
};

export const avecUnCodePromo = () => {
  return <OrderEditor items={[billetsItem, voucherItem, assurancesItem]} totalPrice={totalPrice} {...onActions} />;
};

avecUnCodePromo.story = {
  name: "Avec un code promo"
};

export const avecUnDon = () => {
  return <OrderEditor items={[billetsItem, donationItem]} totalPrice={totalPrice} {...onActions} />;
};

avecUnDon.story = {
  name: "Avec un don"
};
