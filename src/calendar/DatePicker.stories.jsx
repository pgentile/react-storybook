import { useState } from "react";
import { action } from "@storybook/addon-actions";

import DatePicker from "./DatePicker";

export default {
  title: "Calendar / DatePicker",
  component: DatePicker,
};

export const main = () => <DatePicker value="2018-01-07" onChange={action("change")} />;

export const noValue = () => <DatePicker onChange={action("change")} />;

noValue.parameters = {
  storyshots: {
    disable: true,
  },
};

export const demo = () => <DatePickerDemo />;

function DatePickerDemo() {
  const [value, setValue] = useState("2018-01-07");

  const onChange = (newValue) => setValue(newValue);

  return <DatePicker value={value} onChange={onChange} />;
}
