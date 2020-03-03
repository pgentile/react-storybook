import React from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import Button from "../buttons/Button";

export default function FinalButton({ disabled, ...otherProps }) {
  const { submitting } = useFormState({
    subscription: {
      submitting: true
    }
  });

  return <Button {...otherProps} disabled={disabled || submitting} />;
}

FinalButton.propTypes = {
  disabled: PropTypes.bool
};
