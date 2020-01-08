import React from "react";
import { action } from "@storybook/addon-actions";

import AuthWidget from "./AuthWidget";

const onValidate = action("onValidate");

export default {
  title: "Auth / AuthWidget",
  component: AuthWidget
};

export const main = () => {
  return <AuthWidget onValidate={onValidate} />;
};
