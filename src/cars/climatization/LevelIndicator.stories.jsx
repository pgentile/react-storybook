import React from "react";
import { storiesOf } from "@storybook/react";

import LevelIndicator from "./LevelIndicator";

storiesOf("Cars | Core / LevelIndicator", module)
  .add("level 0", () => {
    return <LevelIndicator color="blue" />;
  })
  .add("level 1", () => {
    return <LevelIndicator color="blue" level={1} />;
  })
  .add("level 2", () => {
    return <LevelIndicator color="blue" level={2} />;
  })
  .add("level 3", () => {
    return <LevelIndicator color="blue" level={3} />;
  });
