import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ReCaptcha from "./ReCaptcha";

storiesOf("ReCaptcha", module).add("main", () => {
  return (
    <ReCaptcha
      siteKey="6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt"
      onSuccess={action("success")}
      onExpire={action("expire")}
    />
  );
});
