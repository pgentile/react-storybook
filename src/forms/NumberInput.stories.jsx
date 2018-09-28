import React from "react";
import { storiesOf } from "@storybook/react";

import NumberInput from "./NumberInput";

storiesOf("Forms / NumberInput", module).add("main", () => {
  return <NumberInputDemo />;
});

class NumberInputDemo extends React.PureComponent {
  state = {
    value: ""
  };

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { value } = this.state;
    return <NumberInput value={value} onChange={this.onChange} />;
  }
}
