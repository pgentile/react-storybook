import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DonationProposal from "./DonationProposal";

storiesOf("Payment / Donation / DonationProposal", module).add("main", () => {
  return <DonationProposal onAddDonation={action("add donation")} />;
});
