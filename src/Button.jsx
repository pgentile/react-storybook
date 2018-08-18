import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

import bemModifiers from "./bemModifiers";

export default class Button extends React.PureComponent {
  static propTypes = {
    as: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    showDisabled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "normal", "large"])
  };

  static defaultProps = {
    as: "button",
    className: "",
    showDisabled: false,
    size: "normal"
  };

  render() {
    const { as: Element, children, className, showDisabled, size, ...otherProps } = this.props;

    const realClassName = bemModifiers("button", {
      disabled: showDisabled,
      [`size-${size}`]: true
    });

    return (
      <Element className={`${realClassName} ${className}`} {...otherProps}>
        {children}
      </Element>
    );
  }
}
