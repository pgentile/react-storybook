import React from 'react';
import PropTypes from 'prop-types';

// TODO Change styles
import './DateInput.scss';


export default class YearMonth extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
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

  render() {
    const { value } = this.props;
    const { year, month } = parseValue(value);

    return (
      <fieldset className="date-input">
        <input
          className="date-input__input date-input__input_month"
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="Mois"
          value={month}
          onChange={this.onMonthChange} />

        <input
          className="date-input__input date-input__input_year"
          type="text"
          inputMode="numeric"
          maxLength={4}
          placeholder="Année"
          value={year}
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
