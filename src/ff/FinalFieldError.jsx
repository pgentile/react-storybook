import React from "react";
import PropTypes from "prop-types";
import { useField } from "react-final-form";

import FieldError from "../forms/FieldError";
import getFieldError from "./getFieldError";

export default function FinalFieldError({ name }) {
  const field = useField(name, {
    subscription: {
      error: true,
      submitError: true,
      touched: true,
      pristine: true
    }
  });

  const error = getFieldError(field);
  if (!error) {
    return null;
  }

  return <FieldError>{error}</FieldError>;
}

FinalFieldError.propTypes = {
  name: PropTypes.string.isRequired
};
