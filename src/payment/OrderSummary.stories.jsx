import React from "react";
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

export default {
  title: "Payment | OrderSummary"
};

export const billetsUniquement = () => {
  return <OrderSummary items={[ticketItem]} totalPrice={totalPrice} />;
};

billetsUniquement.story = {
  name: "Billets uniquement"
};

export const billetsAssurances = () => {
  return <OrderSummary items={[ticketItem, insuranceItem]} totalPrice={totalPrice} />;
};

billetsAssurances.story = {
  name: "Billets & assurances"
};

export const avecUnCodePromo = () => {
  return <OrderSummary items={[ticketItem, voucherItem, insuranceItem]} totalPrice={totalPrice} />;
};

avecUnCodePromo.story = {
  name: "Avec un code promo"
};

export const avecUnDon = () => {
  return <OrderSummary items={[ticketItem, donationItem]} totalPrice={totalPrice} />;
};

avecUnDon.story = {
  name: "Avec un don"
};

export const tousLesTypes = () => {
  return <OrderSummary items={[ticketItem, voucherItem, insuranceItem, donationItem]} totalPrice={totalPrice} />;
};

tousLesTypes.story = {
  name: "Tous les types"
};
