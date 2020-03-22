import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import Translation3D from "./Translation3D";

export default {
  title: "Experiments | Translation3D",
  component: Translation3D,
  decorators: [withKnobs],
};

export const main = () => {
  return <Translation3D yTranslate={number("yTranslate", 0)} />;
};
