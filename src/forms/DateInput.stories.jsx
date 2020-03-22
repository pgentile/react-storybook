import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";

import DateInput from "./DateInput";

export default {
  title: "Forms / DateInput",
  component: DateInput,
};

export const main = () => {
  return <DateInput />;
};

export const withValue = () => {
  return <DateInput value="1990-02-13" />;
};

export const demo = () => {
  return <DateInputDemo />;
};

export const error = () => {
  return <DateInput value="1990-02-13" error />;
};

export const disabled = () => {
  return <DateInput value="1990-02-13" disabled />;
};

export const readOnly = () => {
  return <DateInput value="1990-02-13" readOnly />;
};

export const modeYearMonth = () => {
  return <DateInput value="2018-04" mode="year-month" />;
};

export const modeYearMonthWithSmallYear = () => {
  return <DateInput value="22-06" mode="year-month" smallYear />;
};

function DateInputDemo() {
  const [value, setValue] = useState("");
  const onChange = useCallback((newValue, ...args) => {
    setValue(newValue);
    action("change")(newValue, ...args);
  }, []);
  return <DateInput value={value} onChange={onChange} />;
}
