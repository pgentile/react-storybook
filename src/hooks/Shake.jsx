import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./Shake.scss";

export default function Shake({ as: Element = "div", children, revision = null, ...otherProps }) {
  const elementRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(
    () => {
      if (revision !== null) {
        setActive(true);
      }
    },
    [revision]
  );

  useEffect(() => {
    const animationEndListener = () => setActive(false);

    const element = elementRef.current;
    element.addEventListener("animationend", animationEndListener);

    return () => element.removeEventListener("animationend", animationEndListener);
  }, []);

  const className = bemModifiers("shake", { active });

  return (
    <Element {...otherProps} className={className} ref={elementRef}>
      {children}
    </Element>
  );
}

Shake.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  revision: PropTypes.number
};
