import React from "react";
import { storiesOf } from "@storybook/react";

import AutoClimButton from "./AutoClimButton";

storiesOf("Cars | Climatization / AutoClimButton", module).add("main", () => {
  return <AutoClimButton />;
});
