import React from "react";
import PropTypes from "prop-types";
import { format, parse } from "date-fns";
import frLocale from "date-fns/locale/fr";

import bemModifiers from "../utils/bemModifiers";
import DatePicker from "../calendar/DatePicker";

import "./DatePickerInput.scss";

export default class DatePickerInput extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    tabIndex: PropTypes.number,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    tabIndex: 0,
  };

  state = {
    focus: false,
  };

  ref = React.createRef();

  datePickerRef = React.createRef();

  onInputFieldClick = () => {
    this.setState({ focus: true }, () => {
      if (this.datePickerRef.current) {
        this.datePickerRef.current.focus();
      }
    });
  };

  onDatePickerChange = (value) => {
    this.setState({ focus: false });

    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  onOverlayClick = () => {
    this.setState({ focus: false });
  };

  render() {
    const { id, className, tabIndex, error, disabled, readOnly, value } = this.props;
    const dateValue = parse(value, "yyyy-MM-dd", new Date());
    const { focus } = this.state;

    const fieldClassName = bemModifiers("date-picker-input__field", {
      error,
      disabled,
      focus,
      "read-only": readOnly,
    });

    const pickerPanelClassName = bemModifiers("date-picker-input__picker-panel", {
      focus: focus && !disabled & !readOnly,
    });

    return (
      <div className={`date-picker-input ${className}`} id={id} ref={this.ref}>
        <div
          className={fieldClassName}
          onClick={this.onInputFieldClick}
          tabIndex={disabled ? -1 : tabIndex}
          aria-invalid={error}
        >
          {format(dateValue, "EEEE dd MMMM yyyy", { locale: frLocale })}
        </div>
        <div className={pickerPanelClassName}>
          {focus && <DatePicker ref={this.datePickerRef} value={value} onChange={this.onDatePickerChange} />}
        </div>
        {focus && <div className="date-picker-input__overlay" onClick={this.onOverlayClick} />}
      </div>
    );
  }
}
