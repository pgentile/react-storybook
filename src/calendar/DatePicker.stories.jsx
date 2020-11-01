import { PureComponent } from "react";
import { action } from "@storybook/addon-actions";

import DatePicker from "./DatePicker";

export default {
  title: "Calendar / DatePicker",
  component: DatePicker,
};

export const main = () => {
  return <DatePicker value="2018-01-07" onChange={action("change")} />;
};

export const demo = () => {
  return <DatePickerDemo />;
};

class DatePickerDemo extends PureComponent {
  state = {
    value: "2018-01-07",
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <DatePicker value={value} onChange={this.onChange} />;
  }
}
