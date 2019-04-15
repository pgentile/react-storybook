import React from "react";
import { storiesOf } from "@storybook/react";

import HeatedSeatButton from "./HeatedSeatButton";

storiesOf("Cars | Climatization / HeatedSeatButton", module).add("main", () => {
  return <HeatedSeatButton />;
});
