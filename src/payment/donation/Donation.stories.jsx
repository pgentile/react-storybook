import React from "react";
import { action } from "@storybook/addon-actions";

import Donation from "./Donation";

const actions = {
  onAddDonation: action("add donation"),
  onCancelDonation: action("cancel donation")
};

export default {
  title: "Payment | Donation / Donation",
  component: Donation
};

export const noDonationSelected = () => {
  return <Donation {...actions} />;
};

export const donationSelected = () => {
  return <Donation {...actions} selectedDonation={{ code: "SPA", association: "Société protectrice des animaux" }} />;
};
