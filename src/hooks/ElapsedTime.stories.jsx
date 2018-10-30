import React from "react";
import { storiesOf } from "@storybook/react";

import ElapsedTime from "./ElapsedTime";

storiesOf("Hooks / ElapsedTime", module).add("main", () => {
  return <ElapsedTime />;
});
