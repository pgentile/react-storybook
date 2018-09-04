import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import JsonSchemaForm from "./JsonSchemaForm";

storiesOf("JsonSchemaForm / JsonSchemaForm", module).add("main", () => {
  return <JsonSchemaForm onSubmit={action("submit")} onBlur={action("blur")} />;
});
