import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../../utils/bemModifiers";

import "./LedIndicator.scss";

export default function LedIndicator({ as: Element = "div", className = "", enabled = false, color }) {
  const elementClassName = bemModifiers("led-indicator", {
    ["color-" + color]: true,
    enabled
  });
  return <Element className={elementClassName + " " + className} />;
}

LedIndicator.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  enabled: PropTypes.bool,
  color: PropTypes.oneOf(["red", "blue"]).isRequired
};
