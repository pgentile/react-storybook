import React from "react";
import { action } from "@storybook/addon-actions";

import AuthAskPassword from "./AuthAskPassword";

const onCancelClick = action("onCancelClick");
const onValidate = action("onValidate");

export default {
  title: "Auth / AuthAskPassword",
  component: AuthAskPassword
};

export const main = () => {
  return <AuthAskPassword onCancelClick={onCancelClick} onValidate={onValidate} />;
};
