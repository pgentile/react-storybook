import React from "react";
import { action } from "@storybook/addon-actions";

import OrderSummary from "./OrderSummary";

const cancelVoucher = action("cancel voucher");
const cancelInsurance = action("cancel insurance");
const cancelDonation = action("cancel donation");

const ticketItem = {
  id: "billets",
  label: "Vos billets",
  price: {
    value: 109.8,
    currency: "EUR",
  },
};

const cardItem = {
  id: "card",
  label: "Vos cartes de réduction",
  price: {
    value: 75.8,
    currency: "EUR",
  },
};

const insuranceItem = {
  id: "assurances",
  label: "Vos assurances",
  price: {
    value: 5.9,
    currency: "EUR",
  },
  onCancel: cancelInsurance,
};

const voucherItem = {
  id: "voucher",
  label: "Votre code promotion",
  price: {
    value: -2.0,
    currency: "EUR",
  },
  onCancel: cancelVoucher,
};

const donationItem = {
  id: "donation",
  label: "Votre don",
  price: {
    value: 1.0,
    currency: "EUR",
  },
  donationDetails: {
    code: "code",
    association: "Médecins sans frontières",
  },
  onCancel: cancelDonation,
};

export default {
  title: "Payment | OrderSummary",
  component: OrderSummary,
};

export const billetsUniquement = () => {
  return <OrderSummary items={[ticketItem]} />;
};

export const cartesUniquement = () => {
  return <OrderSummary items={[cardItem]} />;
};

export const billetsAssurances = () => {
  return <OrderSummary items={[ticketItem, insuranceItem]} />;
};

export const avecUnCodePromo = () => {
  return <OrderSummary items={[ticketItem, voucherItem, insuranceItem]} />;
};

export const avecUnDon = () => {
  return <OrderSummary items={[ticketItem, donationItem]} />;
};

export const tousLesTypes = () => {
  return <OrderSummary items={[ticketItem, cardItem, voucherItem, insuranceItem, donationItem]} />;
};
