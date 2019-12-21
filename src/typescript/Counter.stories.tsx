import React from "react";
import { storiesOf } from "@storybook/react";

import Counter from "./Counter";

storiesOf("Counter", module).add("main", () => {
  return <Counter intervalMs={500} />;
});
