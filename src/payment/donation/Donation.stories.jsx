import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Donation from "./Donation";

const actions = {
  onAddDonation: action("add donation"),
  onCancelDonation: action("cancel donation")
};

storiesOf("Payment | Donation / Donation", module)
  .add("no donation selected", () => {
    return <Donation {...actions} />;
  })
  .add("donation selected", () => {
    return <Donation {...actions} selectedDonation={{ code: "SPA", association: "Société protectrice des animaux" }} />;
  });
