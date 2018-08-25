import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DateInput from "./DateInput";

storiesOf("Forms / DateInput", module)
  .add("main", () => {
    return <DateInput />;
  })
  .add("with value", () => {
    return <DateInput value="1990-02-13" />;
  })
  .add("dynamic", () => {
    return <DynamicForm />;
  })
  .add("error", () => {
    return <DateInput value="1990-02-13" error />;
  })
  .add("disabled", () => {
    return <DateInput value="1990-02-13" disabled />;
  })
  .add("read-only", () => {
    return <DateInput value="1990-02-13" readOnly />;
  })
  .add("Mode year-month", () => {
    return <DateInput value="2018-04" mode="year-month" />;
  })
  .add("Mode year-month with small year", () => {
    return <DateInput value="22-06" mode="year-month" smallYear />;
  });

class DynamicForm extends React.PureComponent {
  state = {
    value: ""
  };

  onChange = (value, ...args) => {
    this.setState({
      value
    });

    action("change")(value, ...args);
  };

  render() {
    const { value } = this.state;
    return <DateInput value={value} onChange={this.onChange} />;
  }
}
