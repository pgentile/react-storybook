import React, { useCallback } from "react";
import PropTypes from "prop-types";

import isDigits from "../utils/isDigits";

export default function NumberInput({ onChange, ...otherProps }) {
  const handleChange = useCallback(
    (event) => {
      if (!isDigits(event.target.value)) {
        event.preventDefault();
        return;
      }

      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  return (
    <input
      {...otherProps}
      onChange={handleChange}
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      spellCheck={false}
    />
  );
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
};
