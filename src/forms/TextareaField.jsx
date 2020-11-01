import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./TextareaField.scss";

export default function TextareaField({ className = "", error = false, formNoValidate = true, ...otherProps }) {
  const inputClassName = bemModifiers("textarea-field", {
    error,
  });

  return (
    <textarea
      {...otherProps}
      className={`${inputClassName} ${className}`}
      aria-invalid={error}
      formNoValidate={formNoValidate}
    />
  );
}

TextareaField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  formNoValidate: PropTypes.bool,
};
