import React from "react";
import PropTypes from "prop-types";

import "./DateInput.scss";

import bemModifiers from "./bemModifiers";
import isDigits from "./isDigits";

export default class DateInput extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoComplete: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    className: "",
    disabled: false,
    readOnly: false,
    autoComplete: {}
  };

  state = {
    focus: false
  };

  onValueChange = name => event => {
    const { target } = event;
    const { value: fieldValue } = target;

    // Interdire autre chose que des chiffres
    if (!isDigits(fieldValue)) {
      event.preventDefault();
      return;
    }

    const { value, onChange } = this.props;
    if (onChange) {
      const updatedValue = updateValue(value, name, fieldValue);
      if (updatedValue !== value) {
        onChange(updatedValue);
      }
    }

    this.maybeGoToNextInput(target);
  };

  maybeGoToNextInput(target) {
    const { maxLength, selectionStart } = target;

    let nextInput = target.nextElementSibling;
    while (nextInput && nextInput.nodeName !== "INPUT") {
      nextInput = nextInput.nextElementSibling;
    }

    if (nextInput && selectionStart === maxLength) {
      nextInput.focus();
      nextInput.select();
    }
  }

  onDayChange = this.onValueChange("day");
  onMonthChange = this.onValueChange("month");
  onYearChange = this.onValueChange("year");

  onFieldFocus = event => {
    this.setState({
      focus: true
    });

    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  onFieldBlur = () => {
    this.setState({
      focus: false
    });

    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const { id, className, error, disabled, readOnly, value, autoComplete } = this.props;
    const { focus } = this.state;
    const { year, month, day } = parseValue(value);

    const realClassName = bemModifiers("form-date-input", {
      error,
      disabled,
      focus,
      "read-only": readOnly
    });

    return (
      <fieldset className={`${realClassName} ${className}`}>
        <input
          className="form-date-input__input form-date-input__input_day"
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete.day}
          maxLength={2}
          placeholder="JJ"
          id={id}
          value={day}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onDayChange}
        />
        <span className="form-date-input__input-separator">/</span>
        <input
          className="form-date-input__input form-date-input__input_month"
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete.month}
          maxLength={2}
          placeholder="MM"
          value={month}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onMonthChange}
        />
        <span className="form-date-input__input-separator">/</span>
        <input
          className="form-date-input__input form-date-input__input_year"
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete.year}
          maxLength={4}
          placeholder="AAAA"
          value={year}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onYearChange}
        />
      </fieldset>
    );
  }
}

const DEFAULT_DATE = {
  year: "",
  month: "",
  day: ""
};

function parseValue(value) {
  if (value) {
    const parts = value.split("-");
    const [year, month, day] = parts;
    return {
      ...DEFAULT_DATE,
      year,
      month,
      day
    };
  }

  return { ...DEFAULT_DATE };
}

function updateValue(value, fieldName, fieldValue) {
  const updatedValue = {
    ...parseValue(value),
    [fieldName]: fieldValue
  };
  const { year, month, day } = updatedValue;
  if (year || month || day) {
    return `${year}-${month}-${day}`;
  }
  return "";
}
