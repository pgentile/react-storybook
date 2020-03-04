export default function getFieldError(field) {
  const { touched, error, submitError, pristine } = field.meta;
  if (touched && error) {
    return error;
  }
  if (submitError && pristine) {
    return submitError;
  }
}
