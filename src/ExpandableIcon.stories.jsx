import React from "react";

import ExpandableIcon from "./ExpandableIcon";

export default {
  title: "ExpandableIcon",
  component: ExpandableIcon
};

export const folded = () => {
  return <ExpandableIcon />;
};

export const unfolded = () => {
  return <ExpandableIcon expanded />;
};

export const demo = () => {
  return <ExpandableIconDemo />;
};

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
