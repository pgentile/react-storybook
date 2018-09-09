import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SearchOutwardForm from "./SearchOutwardForm";
import SearchInwardForm from "./SearchInwardForm";
import UpdateOwnerForm from "./UpdateOwnerForm";
import UpdatePassengersForm from "./UpdatePassengersForm";

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
  })
  .add("UpdateOwnerForm", () => {
    return <UpdateOwnerForm {...actions} />;
  })
  .add("UpdatePassengersForm", () => {
    return <UpdatePassengersForm {...actions} />;
  });
