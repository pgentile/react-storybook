import React from "react";
import { storiesOf } from "@storybook/react";

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
  });

class DynamicForm extends React.PureComponent {
  state = {
    value: ""
  };

  onChange = value => {
    this.setState({
      value
    });
  };

  render() {
    const { value } = this.state;
    return <DateInput value={value} onChange={this.onChange} />;
  }
}
