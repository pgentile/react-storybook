import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import Translation3D from "./Translation3D";

storiesOf("Experiments | Translation3D", module)
  .addDecorator(withKnobs)
  .add("main", () => {
    return <Translation3D yTranslate={number("yTranslate", 0)} />;
  });
