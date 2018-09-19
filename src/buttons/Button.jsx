import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

import bemModifiers from "../utils/bemModifiers";

export default class Button extends React.PureComponent {
  static propTypes = {
    as: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    showDisabled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    flat: PropTypes.bool,
    toggled: PropTypes.bool
  };

  static defaultProps = {
    as: "button",
    className: "",
    showDisabled: false,
    size: "normal",
    flat: false,
    toggled: false
  };

  render() {
    const { as: Element, children, className, showDisabled, size, flat, toggled, ...otherProps } = this.props;

    const realClassName = bemModifiers("button", {
      disabled: showDisabled,
      [`size-${size}`]: true,
      flat,
      toggled
    });

    return (
      <Element className={`${realClassName} ${className}`} {...otherProps} aria-pressed={toggled}>
        {children}
      </Element>
    );
  }
}
