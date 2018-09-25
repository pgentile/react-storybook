import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Overlay from "./Overlay";

storiesOf("Overlay", module)
  .add("main", () => {
    return <Overlay />;
  })
  .add("clickable", () => {
    return <Overlay onClick={action("click")} />;
  });
