import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NumberInput from "./NumberInput";

storiesOf("Forms / NumberInput", module).add("main", () => {
  return <NumberInput onChange={action("change")} />;
});
