import { useField } from "react-final-form";

export default function useFieldError(name) {
  const field = useField(name, {
    subscription: {
      touched: true,
      error: true,
      dirtySinceLastSubmit: true,
      submitError: true,
    },
  });
  const { touched, error, dirtySinceLastSubmit, submitError } = field.meta;

  if (touched && error) {
    return error;
  }
  if (!dirtySinceLastSubmit && submitError) {
    return submitError;
  }
  return null;
}
