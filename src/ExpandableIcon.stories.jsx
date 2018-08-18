import React from "react";
import { storiesOf } from "@storybook/react";

import ExpandableIcon from "./ExpandableIcon";

storiesOf("ExpandableIcon", module)
  .add("Replié", () => {
    return <ExpandableIcon />;
  })
  .add("Déplié", () => {
    return <ExpandableIcon expanded />;
  })
  .add("Démo", () => {
    return <ExpandableIconDemo />;
  });

class ExpandableIconDemo extends React.PureComponent {
  state = {
    expanded: false
  };

  onClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };

  render() {
    const { expanded } = this.state;
    return <ExpandableIcon expanded={expanded} onClick={this.onClick} />;
  }
}
