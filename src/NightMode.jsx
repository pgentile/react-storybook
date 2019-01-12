import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "./utils/bemModifiers";

import "./NightMode.scss";

export default class NightMode extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {};

  state = {
    enabled: false
  };

  switch = () => {
    this.setState(oldState => {
      return {
        enabled: !oldState.enabled
      };
    });
  };

  render() {
    const { children } = this.props;
    const { enabled } = this.state;

    const className = bemModifiers("night-mode", {
      enabled
    });

    return (
      <div className={className}>
        <p className="night-mode__controls">
          <button className="night-mode__switcher" onClick={this.switch}>
            {enabled ? "Disable" : "Enable"} night mode
          </button>
        </p>
        {children}
      </div>
    );
  }
}
