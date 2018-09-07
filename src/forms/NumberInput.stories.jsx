import React from "react";
import { storiesOf } from "@storybook/react";

import NumberInput from "./NumberInput";

storiesOf("Forms / NumberInput", module).add("main", () => {
  return <NumberInput />;
});
