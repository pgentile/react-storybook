import React from "react";
import { storiesOf } from "@storybook/react";

import SuspenseDemo from "./SuspenseDemo";

storiesOf("Suspense / SuspenseDemo", module).add("main", () => {
  return <SuspenseDemo />;
});
