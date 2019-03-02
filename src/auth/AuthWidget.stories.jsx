import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AuthWidget from "./AuthWidget";

const onValidate = action("onValidate");

storiesOf("Auth / AuthWidget", module).add("main", () => {
  return <AuthWidget onValidate={onValidate} />;
});
