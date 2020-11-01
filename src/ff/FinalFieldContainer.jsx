import PropTypes from "prop-types";
import { useField } from "react-final-form";

import FieldContainer from "../forms/FieldContainer";
import useFieldError from "./useFieldError";

export default function FinalFieldContainer({ type = "text", name, children, disabled = false, ...otherProps }) {
  const field = useField(name, {
    type,
    subscription: {
      submitting: true,
      value: true,
    },
  });

  const error = useFieldError(name);

  return (
    <FieldContainer disabled={disabled || field.meta.submitting} errorMessage={error} {...otherProps}>
      {(props) => children({ ...field.input, ...props })}
    </FieldContainer>
  );
}

FinalFieldContainer.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
