import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import FittedImage from "./FittedImage";

storiesOf("FittedImage", module)
  .addDecorator(withKnobs)
  .add("demo", () => {
    const width = number("width", 300);
    return (
      <div style={{ width: `${width}px` }}>
        <FittedImage src="/images/beautiful-image.jpg" />
      </div>
    );
  });
