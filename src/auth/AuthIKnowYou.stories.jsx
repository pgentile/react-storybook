import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AuthIKnowYou from "./AuthIKnowYou";

const onConnectClick = action("onConnectClick");

storiesOf("Auth / AuthIKnowYou", module).add("main", () => {
  return <AuthIKnowYou onConnectClick={onConnectClick} />;
});
