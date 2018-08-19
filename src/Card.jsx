import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "./bemModifiers";

import "./Card.scss";

export default class Card extends React.PureComponent {
  static propTypes = {
    hasBorder: PropTypes.bool,
    layer: PropTypes.string,
    as: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    hasBorder: true,
    as: "div",
    className: ""
  };

  render() {
    const { as: Element, hasBorder, layer, className, children, ...otherProps } = this.props;

    const bemClass = bemModifiers("card", {
      "has-border": hasBorder,
      [`layer-${layer}`]: !!layer
    });

    return (
      <Element {...otherProps} className={`${bemClass} ${className}`}>
        {children}
      </Element>
    );
  }
}
