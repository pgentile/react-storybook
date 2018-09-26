import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
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
    onFocus: PropTypes.func
  };

  static defaultProps = {
    className: "",
    tabIndex: 0
  };

  state = {
    focus: false
  };

  onFieldClick = event => {
    this.setState(prevState => {
      return {
        focus: !prevState.focus
      };
    });

    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  onDatePickerChange = value => {
    this.setState({
      focus: false
    });

    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { id, className, tabIndex, error, disabled, readOnly, value } = this.props;
    const { focus } = this.state;

    const fieldClassName = bemModifiers("date-picker-input__field", {
      error,
      disabled,
      focus,
      "read-only": readOnly
    });

    const pickerPanelClassName = bemModifiers("date-picker-input__picker-panel", {
      focus: focus && !disabled & !readOnly
    });

    return (
      <div className={`date-picker-input ${className}`} id={id}>
        <div className={fieldClassName} onClick={this.onFieldClick} tabIndex={disabled ? -1 : tabIndex}>
          {format(value, "dddd DD MMMM YYYY", { locale: frLocale })}
        </div>
        <div className={pickerPanelClassName}>
          <DatePicker value={value} onChange={this.onDatePickerChange} />
        </div>
      </div>
    );
  }
}
