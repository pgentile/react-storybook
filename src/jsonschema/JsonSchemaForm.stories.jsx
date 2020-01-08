import React from "react";
import { action } from "@storybook/addon-actions";

import SearchOutwardForm from "./SearchOutwardForm";
import SearchInwardForm from "./SearchInwardForm";
import UpdateOwnerForm from "./UpdateOwnerForm";
import UpdatePassengersForm from "./UpdatePassengersForm";

const actions = {
  onSubmit: action("submit"),
  onBlur: action("blur")
};

export default {
  title: "JsonSchemaForm"
};

export const searchOutwardForm = () => {
  return <SearchOutwardForm {...actions} />;
};

export const searchInwardForm = () => {
  return <SearchInwardForm {...actions} />;
};

export const updateOwnerForm = () => {
  return <UpdateOwnerForm {...actions} />;
};

export const updatePassengersForm = () => {
  return <UpdatePassengersForm {...actions} />;
};
