import React from "react";
import { storiesOf } from "@storybook/react";

import Flippable from "./Flippable";

storiesOf("Flippable", module).add("main", () => {
  return <FlippableDemo />;
});

class FlippableDemo extends React.PureComponent {
  state = {
    flipped: false
  };

  onToggleFace = () => {
    this.setState(state => {
      return {
        flipped: !state.flipped
      };
    });
  };

  render() {
    const { flipped } = this.state;

    const foreground = <p onClick={this.onToggleFace}>Foreground</p>;
    const background = <p onClick={this.onToggleFace}>Background</p>;
    return <Flippable foreground={foreground} background={background} flipped={flipped} />;
  }
}
