import React from "react";
import { storiesOf } from "@storybook/react";

import LedIndicator from "./LedIndicator";

storiesOf("Cars | Heated seats / LedIndicator", module)
  .add("main", () => {
    return <LedIndicator color="red" />;
  })
  .add("enabled", () => {
    return <LedIndicator color="blue" enabled />;
  });
