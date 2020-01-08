import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";

import DatePickerInput from "./DatePickerInput";

export default {
  title: "Forms / DatePickerInput",
  component: DatePickerInput
};

export const main = () => {
  return <DatePickerInput value="1990-02-13" onChange={action("change")} />;
};

export const errorStory = () => {
  return <DatePickerInput value="1990-02-13" onChange={action("change")} error />;
};

export const disabledStory = () => {
  return <DatePickerInput value="1990-02-13" onChange={action("change")} disabled />;
};

export const readOnlyStory = () => {
  return <DatePickerInput value="1990-02-13" onChange={action("change")} readOnly />;
};

export const demo = () => {
  return <DatePickerInputDemo />;
};

function DatePickerInputDemo() {
  const [value, setValue] = useState("1990-02-13");
  const onChange = useCallback(newValue => setValue(newValue), []);
  return <DatePickerInput value={value} onChange={onChange} />;
}
