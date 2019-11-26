import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import VoucherForm from "./VoucherForm";
import sleep from "../utils/sleep";

const actions = {
  onAddVoucher: action("add voucher"),
  onCancel: action("cancel")
};

storiesOf("Payment | VoucherForm", module)
  .add("Défaut", () => {
    return <VoucherForm {...actions} />;
  })
  .add("initial code", () => {
    return <VoucherForm code="EURO2016" {...actions} />;
  })
  .add("submit success", () => {
    return <VoucherForm code="CODE21" {...actions} onAddVoucher={addVoucherWithSuccess} />;
  })
  .add("submit error", () => {
    return <VoucherForm code="CODE21" {...actions} onAddVoucher={addVoucherWithFailure} />;
  });

async function addVoucherWithSuccess() {
  return await sleep(2000);
}

async function addVoucherWithFailure() {
  await sleep(1000);
  throw new Error("Technical error");
}
