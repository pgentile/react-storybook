import React from "react";
import { action } from "@storybook/addon-actions";

import VoucherContainer from "./VoucherContainer";

export default {
  title: "Payment | VoucherContainer",
  component: VoucherContainer
};

export const main = () => {
  return <VoucherContainer onAddVoucher={action("add voucher")} />;
};
