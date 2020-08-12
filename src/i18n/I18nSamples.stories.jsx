import React from "react";
import { number, select } from "@storybook/addon-knobs";

import I18nSamples from "./I18nSamples";

export default {
  title: "I18n / I18nSamples",
  component: I18nSamples,
  parameters: {
    storyshots: false,
  },
};

export const main = () => (
  <I18nSamples
    sampleNumber={number("sampleNumber", 0)}
    currency={select("currency", ["EUR", "USD", "CHF", "GBP"], "EUR")}
  />
);
