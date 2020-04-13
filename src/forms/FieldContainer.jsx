import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Label from "./Label";
import FieldError from "./FieldError";
import useGeneratedFieldId from "./useGeneratedFieldId";

import "./FieldContainer.scss";

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
  readOnly,
}) {
  const inputId = useGeneratedFieldId(id);

  const showErrorMessage = Boolean(errorMessage) && !disabled;
  const showHelpMessage = Boolean(helpMessage) && !disabled;

  const fieldProps = useMemo(
    () => ({
      error: showErrorMessage,
      id: inputId,
      disabled,
      readOnly,
    }),
    [disabled, inputId, readOnly, showErrorMessage]
  );

  return (
    <Element className={`form-field-container ${className}`}>
      {label && (
        <Label className="form-field-container__label" htmlFor={inputId} optional={optional} disabled={disabled}>
          {label}
        </Label>
      )}

      <div className="form-field-container__field">{children(fieldProps)}</div>

      {showErrorMessage && <FieldError className="form-field-container__error">{errorMessage}</FieldError>}

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
  readOnly: PropTypes.bool,
};
