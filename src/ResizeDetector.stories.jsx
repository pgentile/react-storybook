import React from "react";
import { storiesOf } from "@storybook/react";

import ResizeDetector from "./ResizeDetector";

storiesOf("ResizeDetector", module).add("main", () => {
  return <ResizeDetector />;
});
