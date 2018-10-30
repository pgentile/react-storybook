import React from "react";
import { storiesOf } from "@storybook/react";

import ThemedComponent from "./ThemedComponent";

storiesOf("Hooks / ThemedComponent", module).add("main", () => {
  return <ThemedComponent />;
});
