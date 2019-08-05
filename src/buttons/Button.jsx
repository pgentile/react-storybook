import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

import bemModifiers from "../utils/bemModifiers";

export default class Button extends React.PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOf(["small", "normal", "large"]),
    flat: PropTypes.bool,
    toggled: PropTypes.bool
  };

  static defaultProps = {
    as: "button",
    className: "",
    size: "normal",
    flat: false,
    toggled: false
  };

  render() {
    const { as: Element, children, className, size, flat, toggled, ...otherProps } = this.props;

    const realClassName = bemModifiers("button", {
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
