import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./Toggle.scss";

export default class Toggle extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    checked: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    className: "",
    tabIndex: 0,
    checked: false
  };

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { className, tabIndex, checked } = this.props;

    const toggleClassName = bemModifiers("toggle", {
      checked
    });

    return <div tabIndex={tabIndex} className={toggleClassName + " " + className} onClick={this.onClick} />;
  }
}
