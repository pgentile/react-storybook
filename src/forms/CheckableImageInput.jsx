import React, { createRef } from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./CheckableImageInput.scss";

export default class CheckableImageInput extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    type: PropTypes.oneOf(["checkbox", "radio"]),
    name: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: "",
    checked: false,
    type: "radio",
    tabIndex: 0
  };

  inputRef = createRef();

  onClick = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.click();
    }
  };

  render() {
    const { className, children, checked, type, name, value, disabled, readOnly, tabIndex, onChange } = this.props;

    const realClassName = bemModifiers("checkable-image-input", {
      checked,
      disabled,
      "read-only": readOnly
    });

    return (
      <span className={realClassName + " " + className} onClick={this.onClick} tabIndex={tabIndex}>
        <input
          className="checkable-image-input__input"
          tabIndex={-1}
          ref={this.inputRef}
          type={type}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
        />
        {children}
      </span>
    );
  }
}
