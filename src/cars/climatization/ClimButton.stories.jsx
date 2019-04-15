import React from "react";
import { storiesOf } from "@storybook/react";

import ClimButton from "./ClimButton";

storiesOf("Cars | Climatization / ClimButton", module).add("main", () => {
  return <ClimButton title="Button" />;
});
