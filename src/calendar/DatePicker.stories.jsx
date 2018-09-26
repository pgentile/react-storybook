import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatePicker from "./DatePicker";

storiesOf("Calendar / DatePicker", module)
  .add("main", () => {
    return <DatePicker value="2018-01-07" onChange={action("change")} />;
  })
  .add("demo", () => {
    return <DatePickerDemo />;
  });

class DatePickerDemo extends React.PureComponent {
  state = {
    value: "2018-01-07"
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <DatePicker value={value} onChange={this.onChange} />;
  }
}
