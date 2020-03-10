import React from "react";

import Button from "../buttons/Button";
import ProgressButton from "../buttons/ProgressButton";
import { useFormState } from "react-final-form";

export default function FinalProgressButton(props) {
  const { submitting, submitSucceeded } = useFormState({
    subscription: {
      submitting: true,
      submitSucceeded: true
    }
  });

  return <ProgressButton {...props} loading={submitting} finished={submitSucceeded} />;
}

FinalProgressButton.propTypes = {
  ...Button.propTypes
};
