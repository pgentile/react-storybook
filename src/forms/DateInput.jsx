import { PureComponent } from "react";
import PropTypes from "prop-types";

import "./DateInput.scss";

import NumberInput from "./NumberInput";
import bemModifiers from "../utils/bemModifiers";

export default class DateInput extends PureComponent {
  static propTypes = {
    mode: PropTypes.oneOf(["date", "year-month"]),
    smallYear: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoComplete: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    mode: "date",
    smallYear: false,
    className: "",
    autoComplete: {},
  };

  state = {
    focus: false,
  };

  onValueChange = (name) => (event) => {
    const { target } = event;
    const { value: fieldValue } = target;

    const { value, onChange, mode } = this.props;
    if (onChange) {
      const updatedValue = parsers[mode].updateValue(value, name, fieldValue);
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

  onFieldFocus = (event) => {
    this.setState({
      focus: true,
    });

    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  onFieldBlur = () => {
    this.setState({
      focus: false,
    });

    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const { mode, smallYear, id, className, error, disabled, readOnly, value, autoComplete } = this.props;
    const { focus } = this.state;
    const { year, month, day } = parsers[mode].parseValue(value);
    const showDay = mode !== "year-month";

    const realClassName = bemModifiers("form-date-input", {
      error,
      disabled,
      focus,
      "read-only": readOnly,
    });

    const yearClassName = bemModifiers("form-date-input__input", {
      year: true,
      "year-small": smallYear,
    });

    return (
      <fieldset className={`${realClassName} ${className}`}>
        {showDay && (
          <NumberInput
            className="form-date-input__input form-date-input__input--day"
            autoComplete={autoComplete.day}
            maxLength={2}
            placeholder="JJ"
            id={id}
            value={day}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error}
            onFocus={this.onFieldFocus}
            onBlur={this.onFieldBlur}
            onChange={this.onDayChange}
          />
        )}
        {showDay && <span className="form-date-input__input-separator">/</span>}
        <NumberInput
          className="form-date-input__input form-date-input__input--month"
          autoComplete={autoComplete.month}
          maxLength={2}
          placeholder="MM"
          id={!showDay ? id : null}
          value={month}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onMonthChange}
        />
        <span className="form-date-input__input-separator">/</span>
        <NumberInput
          className={yearClassName}
          autoComplete={autoComplete.year}
          maxLength={smallYear ? 2 : 4}
          placeholder={smallYear ? "AA" : "AAAA"}
          value={year}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onYearChange}
        />
      </fieldset>
    );
  }
}

class DateParser {
  defaultDate = {
    year: "",
    month: "",
    day: "",
  };

  parseValue(value) {
    if (value) {
      const parts = value.split("-");
      const [year, month, day] = parts;
      return {
        ...this.defaultDate,
        year,
        month,
        day,
      };
    }
    return this.defaultDate;
  }

  updateValue(value, fieldName, fieldValue) {
    const updatedValue = {
      ...this.parseValue(value),
      [fieldName]: fieldValue,
    };
    const { year, month, day } = updatedValue;
    if (year || month || day) {
      return `${year}-${month}-${day}`;
    }
    return "";
  }
}

class YearMonthParser {
  defaultDate = {
    year: "",
    month: "",
  };

  parseValue(value) {
    if (value) {
      const parts = value.split("-");
      const [year, month] = parts;
      return {
        ...this.defaultDate,
        year,
        month,
      };
    }
    return this.defaultDate;
  }

  updateValue(value, fieldName, fieldValue) {
    const updatedValue = {
      ...this.parseValue(value),
      [fieldName]: fieldValue,
    };
    const { year, month } = updatedValue;
    if (year || month) {
      return `${year}-${month}`;
    }
    return "";
  }
}

const parsers = {
  date: new DateParser(),
  "year-month": new YearMonthParser(),
};
