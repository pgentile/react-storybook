import React from "react";
import { action } from "@storybook/addon-actions";

import SelectedDonation from "./SelectedDonation";

export default {
  title: "Payment / Donation / SelectedDonation",
  component: SelectedDonation,
};

export const main = () => {
  return (
    <SelectedDonation
      donation={{ code: "SPA", association: "Société protectrice des animaux" }}
      onCancelDonation={action("cancel donation")}
    />
  );
};
