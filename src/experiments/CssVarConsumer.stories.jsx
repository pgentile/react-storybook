import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

import CssVarConsumer from "./CssVarConsumer";

export default {
  title: "Experiments / CssVarConsumer",
  component: CssVarConsumer,
  decorators: [withKnobs],
};

export const main = () => <CssVarConsumer customColor={text("customColor", "red")} />;
