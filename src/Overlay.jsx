import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import "./Overlay.scss";

export default function Overlay({ visible = true, children, onClick }) {
  const elementRef = useRef();

  const getElement = () => {
    let element = elementRef.current;
    if (!element) {
      element = document.createElement("div");
      element.className = "overlay-container";

      elementRef.current = element;
    }
    return element;
  };

  useEffect(() => {
    const element = getElement();
    document.body.appendChild(element);

    return () => document.body.removeChild(element);
  }, []);

  const overlay = (
    <div className="overlay" onClick={onClick} hidden={!visible}>
      {children}
    </div>
  );

  return createPortal(overlay, getElement());
}

Overlay.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};
