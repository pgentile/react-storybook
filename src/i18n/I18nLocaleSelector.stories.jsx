import React from "react";
import { storiesOf } from "@storybook/react";

import I18nLocaleSelector from "./I18nLocaleSelector";

storiesOf("I18nLocaleSelector", module).add("main", () => {
  return <I18nLocaleSelector />;
});
