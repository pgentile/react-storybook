import { useMemo } from "react";
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
  labelElement,
  children,
  render,
  errorMessage,
  helpMessage,
  disabled,
  optional,
  readOnly,
}) {
  const inputId = useGeneratedFieldId(id);

  const showErrorMessage = Boolean(errorMessage) && !disabled;
  const showHelpMessage = Boolean(helpMessage);

  const fieldProps = useMemo(
    () => ({
      error: showErrorMessage,
      id: inputId,
      disabled,
      readOnly,
    }),
    [disabled, inputId, showErrorMessage, readOnly]
  );

  const renderFn = render ?? children;
  if (!renderFn) {
    throw new Error("No render ou children function");
  }

  return (
    <Element className={`form-field-container ${className}`}>
      {label && (
        <Label
          as={labelElement}
          className="form-field-container__label"
          htmlFor={inputId}
          optional={optional}
          disabled={disabled}
        >
          {label}
        </Label>
      )}
      <div className="form-field-container__field">{renderFn(fieldProps)}</div>
      {showErrorMessage && <FieldError className="form-field-container__error">{errorMessage}</FieldError>}
      {showHelpMessage && <p className="form-field-container__help">{helpMessage}</p>}
    </Element>
  );
}

FieldContainer.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  label: PropTypes.node,
  labelElement: PropTypes.elementType,
  id: PropTypes.string,
  children: PropTypes.func,
  render: PropTypes.func,
  errorMessage: PropTypes.node,
  helpMessage: PropTypes.node,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  readOnly: PropTypes.bool,
};
