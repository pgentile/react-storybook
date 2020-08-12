import React from "react";
import { action } from "@storybook/addon-actions";

import VoucherForm from "./VoucherForm";
import sleep from "../utils/sleep";

const actions = {
  onAddVoucher: action("add voucher"),
  onCancel: action("cancel"),
};

export default {
  title: "Payment / VoucherForm",
  component: VoucherForm,
};

export const main = () => {
  return <VoucherForm {...actions} />;
};

export const initialCode = () => {
  return <VoucherForm code="EURO2016" {...actions} />;
};

export const submitSuccess = () => {
  return <VoucherForm code="CODE21" {...actions} onAddVoucher={addVoucherWithSuccess} />;
};

export const submitError = () => {
  return <VoucherForm code="CODE21" {...actions} onAddVoucher={addVoucherWithFailure} />;
};

async function addVoucherWithSuccess() {
  return await sleep(2000);
}

async function addVoucherWithFailure() {
  await sleep(1000);
  throw new Error("Technical error");
}
