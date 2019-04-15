import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SelectedDonation from "./SelectedDonation";

storiesOf("Payment | Donation / SelectedDonation", module).add("main", () => {
  return (
    <SelectedDonation
      donation={{ code: "SPA", association: "Société protectrice des animaux" }}
      onCancelDonation={action("cancel donation")}
    />
  );
});
