import React from "react";

import TextareaField from "./TextareaField";

export default {
  title: "Forms / TextareaField",
  component: TextareaField,
};

export const main = () => <TextareaField defaultValue="" />;

export const defaultValue = () => <TextareaField defaultValue="Example" />;

export const avecPlaceholder = () => <TextareaField defaultValue="" placeholder="Example" />;

export const error = () => <TextareaField defaultValue="" error />;

export const disabled = () => <TextareaField defaultValue="Example" disabled />;

export const readOnly = () => <TextareaField defaultValue="Example" readOnly />;
