import React from "react";

import I18nSamples from "./I18nSamples";

export default {
  title: "I18n / I18nSamples",
  component: I18nSamples,
  parameters: {
    storyshots: false,
  },
};

export const Main = (args) => <I18nSamples {...args} />;

Main.argTypes = {
  currency: {
    description: "Monnaie",
    control: {
      type: "select",
      options: ["EUR", "USD", "CHF", "GBP"],
    },
  },
};

Main.args = {
  sampleNumber: 0,
  currency: "EUR",
};
