import React from "react";
import { storiesOf } from "@storybook/react";

import LedIndicator from "./LedIndicator";

storiesOf("Cars | Core / LedIndicator", module)
  .add("main", () => {
    return <LedIndicator color="red" />;
  })
  .add("enabled", () => {
    return <LedIndicator color="blue" enabled />;
  })
  .add("green", () => {
    return <LedIndicator color="green" enabled />;
  })
  .add("normal", () => {
    return <LedIndicator color="red" enabled size="normal" />;
  })
  .add("large", () => {
    return <LedIndicator color="blue" enabled size="large" />;
  })
  .add("blink", () => {
    return <LedIndicator color="red" enabled blink />;
  });
