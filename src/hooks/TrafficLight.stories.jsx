import React from "react";
import { storiesOf } from "@storybook/react";

import TrafficLight from "./TrafficLight";

storiesOf("Hooks / TrafficLight", module).add("main", () => {
  return <TrafficLight />;
});
