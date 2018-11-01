import React from "react";
import { storiesOf } from "@storybook/react";

import HookedForm from "./HookedForm";

storiesOf("Hooks / HookedForm", module).add("main", () => {
  return <HookedForm />;
});
