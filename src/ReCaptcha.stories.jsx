import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ReCaptcha from "./ReCaptcha";

const siteKey = "6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt";

const onSuccess = action("success");
const onExpire = action("expire");

const props = {
  siteKey,
  onSuccess,
  onExpire
};

storiesOf("ReCaptcha", module)
  .add("main", () => {
    return <ReCaptcha {...props} />;
  })
  .add("dark", () => {
    return <ReCaptcha {...props} theme="dark" />;
  })
  .add("compact", () => {
    return <ReCaptcha {...props} size="compact" />;
  });
