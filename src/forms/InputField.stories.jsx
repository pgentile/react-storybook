import React from "react";

import InputField from "./InputField";

import NumberInput from "./NumberInput";

export default {
  title: "Forms / InputField",
  component: InputField,
};

export const main = () => {
  return <InputField defaultValue="" />;
};

export const defaultValue = () => {
  return <InputField defaultValue="Example" />;
};

export const avecPlaceholplaceholderder = () => {
  return <InputField defaultValue="" placeholder="Example" />;
};

export const email = () => {
  return <InputField type="email" placeholder="Adresse email" />;
};

export const password = () => {
  return <InputField type="password" value="password" />;
};

export const number = () => {
  return <InputField as={NumberInput} defaultValue="123" />;
};

export const error = () => {
  return <InputField defaultValue="" error />;
};

export const disabled = () => {
  return <InputField defaultValue="Example" disabled />;
};

export const readOnly = () => {
  return <InputField defaultValue="Example" readOnly />;
};
