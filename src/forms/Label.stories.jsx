import React from "react";
import { storiesOf } from "@storybook/react";

import Label from "./Label";

storiesOf("Forms / Label", module)
  .add("main", () => {
    return <Label>Label</Label>;
  })
  .add("optional", () => {
    return <Label optional>Label</Label>;
  })
  .add("disabled", () => {
    return <Label disabled>Label</Label>;
  })
  .add("optional and disabled", () => {
    return (
      <Label optional disabled>
        Label
      </Label>
    );
  });
