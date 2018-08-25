import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./CheckableImageInput.scss";

export default class CheckableImageInput extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    type: PropTypes.oneOf(["checkbox", "radio"]),
    name: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    type: "radio"
  };

  render() {
    const { children, checked, type, name, onChange } = this.props;

    const realClassName = bemModifiers("checkable-image-input", {
      checked
    });

    return (
      <span className={realClassName}>
        <input className="checkable-image-input__input" type={type} name={name} checked={checked} onChange={onChange} />
        {children}
      </span>
    );
  }
}
