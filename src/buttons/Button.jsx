import PropTypes from "prop-types";

import "./Button.scss";

import bemModifiers from "../utils/bemModifiers";

function Button({
  as: Element = "button",
  children,
  className = "",
  size = "normal",
  flat = false,
  toggled,
  link = false,
  ...otherProps
}) {
  const realClassName = bemModifiers("button", {
    [`size-${size}`]: true,
    flat,
    toggled,
    link,
  });

  return (
    <Element className={`${realClassName} ${className}`} {...otherProps} aria-pressed={toggled}>
      {children}
    </Element>
  );
}

Button.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "normal", "large"]),
  flat: PropTypes.bool,
  toggled: PropTypes.bool,
  link: PropTypes.bool,
};

export default Button;
