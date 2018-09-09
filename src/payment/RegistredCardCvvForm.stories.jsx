import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RegistredCardCvvForm from "./RegistredCardCvvForm";

const stories = storiesOf("Payment / RegistredCardCvvForm", module);

["visa", "mastercard", "american-express", "maestro"].forEach(brand => {
  stories.add(brand, () => {
    return <RegistredCardCvvForm brand={brand} onUseCard={action("use card")} onCancel={action("hide CVV")} />;
  });
});
