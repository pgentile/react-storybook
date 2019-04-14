import React from "react";
import { storiesOf } from "@storybook/react";

import HeatedSeatButton from "./HeatedSeatButton";

storiesOf("Cars / Heated seats / HeatedSeatButton", module).add("main", () => {
  return <HeatedSeatButton />;
});
