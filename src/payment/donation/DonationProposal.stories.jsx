import React from "react";
import { action } from "@storybook/addon-actions";

import DonationProposal from "./DonationProposal";

export default {
  title: "Payment / Donation / DonationProposal",
  component: DonationProposal,
};

export const main = () => {
  return <DonationProposal onAddDonation={action("add donation")} />;
};
