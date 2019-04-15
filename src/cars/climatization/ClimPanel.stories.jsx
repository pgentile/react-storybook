import React from "react";
import { storiesOf } from "@storybook/react";

import ClimPanel from "./ClimPanel";

storiesOf("Cars | Climatization / ClimPanel", module).add("main", () => {
  return <ClimPanel />;
});
