import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

import YearMonthInput from "./YearMonthInput";

storiesOf("Forms / YearMonthInput", module)
  .addDecorator(withKnobs)
  .add("main", () => {
    return <YearMonthInput onChange={action("onChange")} />;
  });
