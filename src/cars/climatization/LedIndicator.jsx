import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../../utils/bemModifiers";

import "./LedIndicator.scss";

export default function LedIndicator({
  as: Element = "div",
  className = "",
  enabled = false,
  size = "normal",
  blink = false,
  color
}) {
  const elementClassName = bemModifiers("led-indicator", {
    ["color-" + color]: true,
    ["size-" + size]: true,
    enabled,
    blink
  });
  return <Element className={elementClassName + " " + className} />;
}

LedIndicator.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  enabled: PropTypes.bool,
  size: PropTypes.oneOf(["normal", "large"]),
  color: PropTypes.oneOf(["red", "blue", "green", "orange"]).isRequired,
  blink: PropTypes.bool
};
