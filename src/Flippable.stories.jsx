import { PureComponent } from "react";

import Flippable from "./Flippable";
import Card from "./Card";

import "./Flippable.stories.scss";

export default {
  title: "Flippable",
  component: Flippable,
};

export const main = () => {
  return <FlippableDemo />;
};

class FlippableDemo extends PureComponent {
  state = {
    flipped: false,
  };

  onToggleFace = () => {
    this.setState((state) => {
      return {
        flipped: !state.flipped,
      };
    });
  };

  render() {
    const { flipped } = this.state;

    const foreground = (
      <Card layer="flat" className="flippable-story__card" onClick={this.onToggleFace}>
        <p>Foreground</p>
      </Card>
    );
    const background = (
      <Card layer="flat" className="flippable-story__card" onClick={this.onToggleFace}>
        <p>Background</p>
      </Card>
    );
    return <Flippable foreground={foreground} background={background} flipped={flipped} />;
  }
}
