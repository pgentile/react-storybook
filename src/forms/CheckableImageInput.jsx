import { PureComponent, createRef } from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./CheckableImageInput.scss";

export default class CheckableImageInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    type: PropTypes.oneOf(["checkbox", "radio"]),
    name: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    type: "radio",
    tabIndex: 0,
  };

  inputRef = createRef();

  onClick = (event) => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  onKeyPress = (event) => {
    if (this.inputRef.current && (event.key === "Enter" || event.key === " ")) {
      this.inputRef.current.click();
    }

    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  };

  onInputClick = (event) => {
    event.stopPropagation();
  };

  render() {
    const {
      className,
      children,
      label,
      checked,
      type,
      name,
      value,
      disabled,
      readOnly,
      tabIndex,
      onChange,
      ...otherProps
    } = this.props;

    const realClassName = bemModifiers("checkable-image-input", {
      checked,
      disabled,
      "read-only": readOnly,
    });

    return (
      <span
        {...otherProps}
        className={realClassName + " " + className}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        tabIndex={tabIndex}
        role={type}
        aria-checked={checked}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        aria-label={label}
      >
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
          onClick={this.onInputClick}
        />
        {children}
      </span>
    );
  }
}
