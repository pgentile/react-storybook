import React from "react";
import PropTypes from "prop-types";
import { useField } from "react-final-form";

import FieldContainer from "../forms/FieldContainer";
import useFieldError from "./useFieldError";

export default function FinalFieldContainer({ type = "text", name, label, children, disabled = false, ...otherProps }) {
  const field = useField(name, {
    type,
    subscription: {
      submitting: true,
      value: true
    }
  });

  const error = useFieldError(name);

  return (
    <FieldContainer label={label} disabled={disabled || field.meta.submitting} errorMessage={error} {...otherProps}>
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
