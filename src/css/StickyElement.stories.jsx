import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import StickyElement from "./StickyElement";

storiesOf("CSS | StickyElement", module)
  .addDecorator(withKnobs)
  .add("main", () => {
    return <StickyElement top={number("top", 0, { min: 0, step: 1 })} />;
  });
