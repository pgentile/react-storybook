import React from "react";
import { storiesOf } from "@storybook/react";

import PaymentMeans from "./PaymentMeans";
import { action } from "@storybook/addon-actions";

const means = ["visa", "mastercard", "maestro", "american-express"];

const actions = {
  onMeanChange: action("mean change")
};

storiesOf("Payment | PaymentMeans", module)
  .add("main", () => {
    return <PaymentMeans means={means} {...actions} />;
  })
  .add("disabled", () => {
    return <PaymentMeans means={means} disabled {...actions} />;
  })
  .add("selected", () => {
    return <PaymentMeans selectedMean="mastercard" means={means} {...actions} />;
  });
