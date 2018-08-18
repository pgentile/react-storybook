import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import VoucherForm from "./VoucherForm";
import sleep from "./sleep";

const actions = {
  onAddVoucher: action("add voucher"),
  onCancel: action("cancel")
};

storiesOf("Payment / VoucherForm", module)
  .add("Défaut", () => {
    return <VoucherForm {...actions} />;
  })
  .add("initial code", () => {
    return <VoucherForm isInitialValid code="EURO2016" {...actions} />;
  })
  .add("submit success", () => {
    return <VoucherForm isInitialValid code="CODE21" {...actions} onAddVoucher={addVoucherWithSuccess} />;
  })
  .add("submit error", () => {
    return <VoucherForm isInitialValid code="CODE21" {...actions} onAddVoucher={addVoucherWithFailure} />;
  });

async function addVoucherWithSuccess() {
  return await sleep(2000);
}

async function addVoucherWithFailure() {
  await sleep(1000);
  throw new Error("Technical error");
}
