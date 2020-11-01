import { useCallback, useRef } from "react";
import PropTypes from "prop-types";

import "./PrefixedInput.scss";

export default function PrefixedInput({ prefix, ...other }) {
  const inputRef = useRef();

  const handlePrefixClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <span className="prefixed-input">
      {prefix && (
        <span className="prefixed-input__prefix" onClick={handlePrefixClick}>
          {prefix}
        </span>
      )}
      <input className="prefixed-input__input" {...other} ref={inputRef} />
    </span>
  );
}

PrefixedInput.propTypes = {
  prefix: PropTypes.node.isRequired,
};
