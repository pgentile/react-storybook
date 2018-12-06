import React from "react";
import { storiesOf } from "@storybook/react";

import LoadingText from "./LoadingText";

storiesOf("LoadingText", module).add("main", () => {
  return <LoadingText />;
});
