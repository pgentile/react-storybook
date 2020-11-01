import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./Shake.scss";

export default function Shake({ as: Element = "div", children, enabled = false, revision = null, ...otherProps }) {
  const prevRevisionRef = useRef();
  const elementRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (enabled && revision !== prevRevisionRef.current) {
      prevRevisionRef.current = revision;
      setActive(true);
    }
  }, [revision, enabled]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const animationEndListener = () => setActive(false);

    const element = elementRef.current;
    element.addEventListener("animationend", animationEndListener);

    return () => element.removeEventListener("animationend", animationEndListener);
  }, [active]);

  const className = bemModifiers("shake", { active });

  return (
    <Element {...otherProps} className={className} ref={elementRef}>
      {children}
    </Element>
  );
}

Shake.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  enabled: PropTypes.bool,
  revision: PropTypes.number,
};
