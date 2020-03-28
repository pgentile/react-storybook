import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "./utils/bemModifiers";

import "./Card.scss";

export default function Card({
  as: Element = "div",
  hasBorder = true,
  layer,
  className = "",
  children,
  ...otherProps
}) {
  const bemClass = bemModifiers("card", {
    "has-border": hasBorder,
    [`layer-${layer}`]: !!layer,
  });

  return (
    <Element {...otherProps} className={`${bemClass} ${className}`}>
      {children}
    </Element>
  );
}

Card.propTypes = {
  hasBorder: PropTypes.bool,
  layer: PropTypes.string,
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
