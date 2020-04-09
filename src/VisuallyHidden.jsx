import React from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { hideVisually } from "polished";

export default function VisuallyHidden({ as: Element = "span", className = "", children, ...otherProps }) {
  return (
    <Element className={cx(css(hideVisually()), className)} {...otherProps}>
      {children}
    </Element>
  );
}

VisuallyHidden.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
