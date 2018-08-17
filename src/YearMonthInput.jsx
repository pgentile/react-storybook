import React from 'react';
import PropTypes from 'prop-types';

import './DateInput.scss';

import bemModifiers from './bemModifiers';


export default class YearMonth extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    disabled: false,
    readOnly: false,
  };

  state = {
    focus: false,
  };

  onValueChange = (name) => (event) => {
    const { target } = event;
    const { value: fieldValue } = target;

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
    const { maxLength, selectionStart, nextElementSibling: nextInput } = target;

    if (nextInput && nextInput.nodeName === 'INPUT' && selectionStart === maxLength) {
      nextInput.focus();
      nextInput.select();
    }
  }

  onMonthChange = this.onValueChange('month');
  onYearChange = this.onValueChange('year');

  onFieldFocus = () => {
    this.setState({
      focus: true,
    });
  };

  onFieldBlur = () => {
    this.setState({
      focus: false,
    });
  };

  render() {
    const { id, className, error, disabled, readOnly, value } = this.props;
    const { focus } = this.state;
    const { year, month } = parseValue(value);

    const realClassName = bemModifiers('form-date-input', {
      error,
      disabled,
      focus,
      'read-only': readOnly,
    });

    return (
      <fieldset className={`${realClassName} ${className}`}>
        <input
          className="form-date-input__input form-date-input__input_month"
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="Mois"
          id={id}
          value={month}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onMonthChange} />

        <input
          className="form-date-input__input form-date-input__input_year"
          type="text"
          inputMode="numeric"
          maxLength={4}
          placeholder="Année"
          value={year}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={this.onFieldFocus}
          onBlur={this.onFieldBlur}
          onChange={this.onYearChange} />
      </fieldset>
    );
  }

}


const DEFAULT_DATE = {
  year: '',
  month: '',
};


function parseValue(value) {
  if (value) {
    const parts = value.split('-');
    const [year, month] = parts;
    return {
      ...DEFAULT_DATE,
      year,
      month,
    };
  }

  return { ...DEFAULT_DATE };
}


function updateValue(value, fieldName, fieldValue) {
  const updatedValue = {
    ...parseValue(value),
    [fieldName]: fieldValue,
  };
  const { year, month } = updatedValue;
  if (year || month) {
    return `${year}-${month}`;
  }
  return '';
}
