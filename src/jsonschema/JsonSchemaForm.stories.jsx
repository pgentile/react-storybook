import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SearchOutwardForm from "./SearchOutwardForm";
import SearchInwardForm from "./SearchInwardForm";

const actions = {
  onSubmit: action("submit"),
  onBlur: action("blur")
};

storiesOf("JsonSchemaForm", module)
  .add("SearchOutwardForm", () => {
    return <SearchOutwardForm {...actions} />;
  })
  .add("SearchInwardForm", () => {
    return <SearchInwardForm {...actions} />;
  });
