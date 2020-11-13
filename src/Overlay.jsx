import { useEffect, useRef } from "react";
import { css } from "@emotion/css/macro";
import { rgba, cover } from "polished";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export default function Overlay({ visible = true, children, onClick }) {
  const elementRef = useRef();

  const getElement = () => {
    let element = elementRef.current;
    if (!element) {
      element = document.createElement("div");
      element.dataset.origin = "overlay-container";

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
    <div
      className={css({
        ...cover(),
        backgroundColor: rgba("#000", 0.7),
        zIndex: 1000,
      })}
      onClick={onClick}
      hidden={!visible}
    >
      {children}
    </div>
  );

  return createPortal(overlay, getElement());
}

Overlay.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
