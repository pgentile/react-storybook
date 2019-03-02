import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AuthAskPassword from "./AuthAskPassword";

const onCancelClick = action("onCancelClick");
const onValidate = action("onValidate");

storiesOf("Auth / AuthAskPassword", module).add("main", () => {
  return <AuthAskPassword onCancelClick={onCancelClick} onValidate={onValidate} />;
});
