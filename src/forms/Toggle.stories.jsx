import React from "react";
import { storiesOf } from "@storybook/react";

import Toggle from "./Toggle";

storiesOf("Forms / Toggle", module)
  .add("unchecked", () => {
    return <Toggle />;
  })
  .add("checked", () => {
    return <Toggle checked />;
  })
  .add("demo", () => {
    return <ToggleDemo />;
  })
  .add("disabled", () => {
    return <Toggle disabled />;
  })
  .add("readOnly", () => {
    return <Toggle readOnly />;
  });

class ToggleDemo extends React.PureComponent {
  state = {
    checked: false
  };

  onClick = () => {
    this.setState(({ checked }) => ({
      checked: !checked
    }));
  };

  render() {
    const { checked } = this.state;

    return <Toggle checked={checked} onClick={this.onClick} />;
  }
}
