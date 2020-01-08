import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import FittedImage from "./FittedImage";

export default {
  title: "FittedImage",
  component: FittedImage,
  decorators: [withKnobs]
};

export const demo = () => {
  const width = number("width", 300);
  return (
    <div style={{ width: `${width}px` }}>
      <FittedImage src="/images/beautiful-image.jpg" />
    </div>
  );
};
