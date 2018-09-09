import React from "react";
import PropTypes from "prop-types";

import "./Flippable.scss";
import bemModifiers from "./utils/bemModifiers";

export default class Flippable extends React.PureComponent {
  static propTypes = {
    foreground: PropTypes.node.isRequired,
    background: PropTypes.node.isRequired,
    flipped: PropTypes.bool
  };

  static defaultProps = {
    flipped: false
  };

  render() {
    const { foreground, background, flipped } = this.props;

    const realClassName = bemModifiers("flippable", {
      flipped
    });

    return (
      <div className={realClassName}>
        <div className="flippable__face flippable__face--foreground" aria-hidden={flipped}>
          {foreground}
        </div>
        <div className="flippable__face flippable__face--background" aria-hidden={!flipped}>
          {background}
        </div>
      </div>
    );
  }
}
