import React from "react";
import { storiesOf } from "@storybook/react";

import NightModePreference from "./NightModePreference";

storiesOf("NightModePreference", module).add("main", () => {
  return <NightModePreference />;
});
