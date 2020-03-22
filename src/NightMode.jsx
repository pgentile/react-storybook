import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import bemModifiers from "./utils/bemModifiers";

import "./NightMode.scss";

export default function NightMode({ children }) {
  const [enabled, setEnabled] = useState(false);

  const onSwitchClick = useCallback(() => {
    setEnabled((prevValue) => !prevValue);
  }, []);

  const className = bemModifiers("night-mode", {
    enabled,
  });

  return (
    <div className={className}>
      <p className="night-mode__controls">
        <button className="night-mode__switcher" onClick={onSwitchClick}>
          {enabled ? "Disable" : "Enable"} night mode
        </button>
      </p>
      {children}
    </div>
  );
}

NightMode.propTypes = {
  children: PropTypes.node,
};
