import React from "react";
import { storiesOf } from "@storybook/react";

import WindshieldButton from "./WindshieldButton";

storiesOf("Cars | Climatization / WindshieldButton", module).add("main", () => {
  return <WindshieldButton />;
});
