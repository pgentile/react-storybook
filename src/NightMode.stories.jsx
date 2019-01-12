import React from "react";
import { storiesOf } from "@storybook/react";

import NightMode from "./NightMode";

storiesOf("NightMode", module).add("main", () => {
  return (
    <NightMode>
      <h1>Title</h1>
      <p>This is a night mode enabled component</p>
    </NightMode>
  );
});
