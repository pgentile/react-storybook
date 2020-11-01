import { PureComponent, createRef } from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./Toggle.scss";

export default class Toggle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: "",
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
    const { className, checked, name, value, disabled, readOnly, tabIndex, onChange, ...otherProps } = this.props;

    const realClassName = bemModifiers("toggle", {
      checked,
    });

    return (
      <div
        {...otherProps}
        className={realClassName + " " + className}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        tabIndex={tabIndex}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-readonly={readOnly}
      >
        <input
          className="toggle__input"
          tabIndex={-1}
          ref={this.inputRef}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onClick={this.onInputClick}
        />
      </div>
    );
  }
}
