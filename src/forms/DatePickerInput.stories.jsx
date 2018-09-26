import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatePickerInput from "./DatePickerInput";

storiesOf("Forms / DatePickerInput", module)
  .add("main", () => {
    return <DatePickerInput value="1990-02-13" onChange={action("change")} />;
  })
  .add("error", () => {
    return <DatePickerInput value="1990-02-13" onChange={action("change")} error />;
  })
  .add("disabled", () => {
    return <DatePickerInput value="1990-02-13" onChange={action("change")} disabled />;
  })
  .add("read-only", () => {
    return <DatePickerInput value="1990-02-13" onChange={action("change")} readOnly />;
  })
  .add("demo", () => {
    return <DatePickerInputDemo />;
  });

class DatePickerInputDemo extends React.PureComponent {
  state = {
    value: "1990-02-13"
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <DatePickerInput value={value} onChange={this.onChange} />;
  }
}
