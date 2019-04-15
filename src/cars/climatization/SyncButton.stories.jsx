import React from "react";
import { storiesOf } from "@storybook/react";

import SyncButton from "./SyncButton";

storiesOf("Cars | Climatization / SyncButton", module).add("main", () => {
  return <SyncButton />;
});
