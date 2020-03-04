import React from "react";
import PropTypes from "prop-types";

import "./FieldError.scss";

export default function FieldError({ as: Element = "p", className = "", children }) {
  return <Element className={`field-error ${className}`}>{children}</Element>;
}

FieldError.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node
};
