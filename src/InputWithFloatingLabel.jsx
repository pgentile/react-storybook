/* eslint-disable react/prop-types */

import { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import bemModifiers from "./utils/bemModifiers";
import useGeneratedFieldId from "./forms/useGeneratedFieldId";

import "./InputWithFloatingLabel.scss";

const InputWithFloatingLabel = forwardRef(function InputWithFloatingLabel(
  { label, onFocus, onBlur, onChange, value, id, ...props },
  ref
) {
  const className = "input-with-floating-label";

  const [focus, setFocus] = useState(false);
  const [emptyInput, setEmptyInput] = useState(!value);

  const handleFocus = (event) => {
    setFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setFocus(false);
    if (onFocus) {
      onBlur(event);
    }
  };

  const handleChange = (event) => {
    setEmptyInput(!event.currentTarget.value);
    if (onChange) {
      onChange(event);
    }
  };

  const labelClassName = bemModifiers(`${className}__label`, {
    focus,
    float: focus || !emptyInput,
  });

  const realId = useGeneratedFieldId(id);

  return (
    <span className={className}>
      <label className={labelClassName} htmlFor={realId}>
        {label}
      </label>
      <input
        className={`${className}__input`}
        ref={ref}
        {...props}
        id={realId}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </span>
  );
});

InputWithFloatingLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputWithFloatingLabel;
