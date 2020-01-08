import React from "react";

import NumberInput from "./NumberInput";

export default {
  title: "Forms / NumberInput",
  component: NumberInput
};

export const main = () => {
  return <NumberInputDemo />;
};

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
