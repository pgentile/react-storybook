import React from "react";
import { storiesOf } from "@storybook/react";

import LoadingText from "./LoadingText";

storiesOf("LoadingText", module)
  .add("main", () => {
    return <LoadingText />;
  })
  .add("10 lines", () => {
    return <LoadingText count={10} />;
  })
  .add("2 lines", () => {
    return <LoadingText count={2} />;
  });
