import PropTypes from "prop-types";

import "./InputField.scss";

import bemModifiers from "../utils/bemModifiers";

export default function InputField({
  as: Element = "input",
  className = "",
  error = false,
  formNoValidate = true,
  ...otherProps
}) {
  const inputClassName = bemModifiers("form-input-field", {
    error,
  });

  return (
    <Element
      type="text"
      {...otherProps}
      className={`${inputClassName} ${className}`}
      aria-invalid={error}
      formNoValidate={formNoValidate}
    />
  );
}

InputField.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  error: PropTypes.bool,
  formNoValidate: PropTypes.bool,
};
