import React from "react";
import { action } from "@storybook/addon-actions";

import Overlay from "./Overlay";

export default {
  title: "Overlay",
  component: Overlay,
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <Overlay />;
};

export const clickable = () => {
  return <Overlay onClick={action("click")} />;
};
