import React from "react";
import PropTypes from "prop-types";

import "./ClimButton.scss";

export default function ClimButton({ topLed = null, title, bottomLed = null, onClick = null }) {
  return (
    <button className="clim-button" onClick={onClick}>
      <div className="clim-button__grid">
        <div className="clim-button__top-led">{topLed}</div>
        <div className="clim-button__title">{title}</div>
        <div className="clim-button__bottom-led">{bottomLed}</div>
      </div>
    </button>
  );
}

ClimButton.propTypes = {
  topLed: PropTypes.node,
  title: PropTypes.string.isRequired,
  bottomLed: PropTypes.node,
  onClick: PropTypes.func,
};
