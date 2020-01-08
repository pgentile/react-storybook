import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import StickyElement from "./StickyElement";

export default {
  title: "CSS | StickyElement",
  component: StickyElement,
  decorators: [withKnobs]
};

export const main = () => {
  return <StickyElement top={number("top", 0, { min: 0, step: 1 })} />;
};
