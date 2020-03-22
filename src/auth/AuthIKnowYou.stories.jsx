import React from "react";
import { action } from "@storybook/addon-actions";

import AuthIKnowYou from "./AuthIKnowYou";

const onConnectClick = action("onConnectClick");

export default {
  title: "Auth / AuthIKnowYou",
  component: AuthIKnowYou,
};

export const main = () => {
  return <AuthIKnowYou onConnectClick={onConnectClick} />;
};
