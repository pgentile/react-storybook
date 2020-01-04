import React from "react";
import PropTypes from "prop-types";

import "./StickyElement.scss";

export default function StickyElement({ top = 0 }) {
  return (
    <div className="sticky">
      Root element
      <div className="sticky__container">
        Container element start
        <div className="sticky__element" style={{ top: `${top}px` }}>
          This is the sticky element
        </div>
        Container element end
      </div>
    </div>
  );
}

StickyElement.propTypes = {
  top: PropTypes.number.isRequired
};
