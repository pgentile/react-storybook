import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CreateUserAccountForm from "./CreateUserAccountForm";

storiesOf("Users / CreateUserAccountForm", module).add("main", () => {
  return <CreateUserAccountForm onCreate={action("create")} />;
});
