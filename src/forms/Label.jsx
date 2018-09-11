import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./Label.scss";

export default class Label extends React.PureComponent {
  static propTypes = {
    as: PropTypes.string,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    disabled: PropTypes.bool,
    optional: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    as: "label",
    className: "",
    optional: false
  };

  render() {
    const { as: Element, className, htmlFor, disabled, optional, children, ...otherProps } = this.props;

    const labelClassName = bemModifiers("label", {
      disabled
    });

    return (
      <Element
        {...otherProps}
        htmlFor={Element === "label" ? htmlFor : null}
        className={`${labelClassName} ${className}`}
      >
        {children}
        {optional && <span className="label__optional"> (facultatif)</span>}
      </Element>
    );
  }
}
