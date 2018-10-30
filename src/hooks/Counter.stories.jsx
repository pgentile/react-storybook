import React from "react";
import { storiesOf } from "@storybook/react";

import Counter from "./Counter";

storiesOf("Hooks / Counter", module).add("main", () => {
  return <Counter />;
});
