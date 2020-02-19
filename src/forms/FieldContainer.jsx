import React, { useState } from "react";
import PropTypes from "prop-types";

import Label from "./Label";

import "./FieldContainer.scss";

let count = 0;

export default function FieldContainer({
  as: Element = "div",
  className = "",
  id,
  label,
  children,
  errorMessage,
  helpMessage,
  disabled,
  optional,
  readOnly
}) {
  const [generatedId] = useState(() => `form-field-${count++}`);

  const showErrorMessage = !!errorMessage && !disabled;
  const showHelpMessage = !!helpMessage && !disabled;
  const inputId = id || generatedId;

  const fieldProps = {
    error: showErrorMessage,
    id: inputId,
    disabled,
    readOnly
  };

  return (
    <Element className={`form-field-container ${className}`}>
      {label && (
        <Label className="form-field-container__label" htmlFor={inputId} optional={optional} disabled={disabled}>
          {label}
        </Label>
      )}

      <div className="form-field-container__field">{children(fieldProps)}</div>

      {showErrorMessage && <p className="form-field-container__error">{errorMessage}</p>}

      {showHelpMessage && <p className="form-field-container__help">{helpMessage}</p>}
    </Element>
  );
}

FieldContainer.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string,
  children: PropTypes.func.isRequired,
  errorMessage: PropTypes.node,
  helpMessage: PropTypes.node,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  readOnly: PropTypes.bool
};
