import React from "react";
import PropTypes from "prop-types";
import { useField } from "react-final-form";

import FieldContainer from "../forms/FieldContainer";

export default function FinalFieldContainer({
  type = "text",
  name,
  label,
  children,
  disabled = false,
  className = ""
}) {
  const field = useField(name, {
    type,
    subscription: {
      value: true,
      error: true,
      submitError: true,
      submitting: true,
      touched: true,
      pristine: true
    }
  });

  return (
    <FieldContainer
      label={label}
      disabled={disabled || field.meta.submitting}
      errorMessage={getFieldError(field)}
      className={className}
    >
      {props => children({ ...field.input, ...props })}
    </FieldContainer>
  );
}

FinalFieldContainer.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

function getFieldError(field) {
  const { touched, error, submitError, pristine } = field.meta;
  if (touched && error) {
    return error;
  }
  if (submitError && pristine) {
    return submitError;
  }
}
