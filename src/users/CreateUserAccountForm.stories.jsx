import React from "react";
import { action } from "@storybook/addon-actions";

import CreateUserAccountForm from "./CreateUserAccountForm";

export default {
  title: "Users / CreateUserAccountForm",
  component: CreateUserAccountForm
};

export const main = () => {
  return <CreateUserAccountForm onCreate={action("create")} />;
};
