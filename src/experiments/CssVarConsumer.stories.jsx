import React from "react";

import CssVarConsumer from "./CssVarConsumer";

export default {
  title: "Experiments / CssVarConsumer",
  component: CssVarConsumer,
  argTypes: {
    customColor: {
      control: {
        type: "color",
      },
    },
  },
};

export const main = (args) => <CssVarConsumer {...args} />;

main.args = {
  customColor: "red",
};
