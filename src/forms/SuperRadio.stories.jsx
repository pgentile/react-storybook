import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import SuperRadio from "./SuperRadio";

storiesOf("Forms / SuperRadio", module)
  .add("main", () => {
    return (
      <SuperRadio
        label="Radio button"
        description="This is my radio button"
        onChange={action("on checked change")}
        icon={faCoffee}
      />
    );
  })
  .add("checked", () => {
    return (
      <SuperRadio
        label="Radio button"
        description="This is my radio button"
        onChange={action("on checked change")}
        checked
        icon={faCoffee}
      />
    );
  })
  .add("help", () => {
    return (
      <SuperRadio
        label="Radio button"
        description="This is my radio button"
        onChange={action("on checked change")}
        icon={faCoffee}
        help={<p>This is my help</p>}
      />
    );
  })
  .add("without icon", () => {
    return <SuperRadio label="Radio button" description="This is my radio button" />;
  });
