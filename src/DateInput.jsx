import React from 'react';
import PropTypes from 'prop-types';


const DATE_REGEX = /^([0-9]{0,4})-([0-9]{0,2})-([0-9]{0,2})$/;


export default class DateInput extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    valueProp: null,
    year: '',
    month: '',
    day: '',
  };

  inputRefs = {
    year: null,
    month: null,
    day: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    const { valueProp } = prevState;
    if (value !== valueProp) {
      if (value) {
        const matches = value.match(DATE_REGEX);
        if (matches) {
          const [, year, month, day] = matches;
          return {
            year,
            month,
            day,
            valueProp: value,
          };
        }
      }

      return {
        year: '',
        month: '',
        day: '',
        valueProp: value,
      };
    }
    return null;
  }

  onValueChange = (name, callback) => (event) => {
    const value = event.target.value;

    const { onChange } = this.props;
    if (onChange) {
      const { year, month, day } = this.state;
      const date = { year, month, day };
      date[name] = value;
      onChange(`${date.year}-${date.month}-${date.day}`);
    }

    if (callback) {
      callback(event);
    }

    this.setState({
      [name]: value,
    });
  };

  onDayChange = this.onValueChange('day', event => {
    if (event.target.selectionStart === 2) {
      const nextInput = this.inputRefs.month;
      nextInput.focus();
      nextInput.setSelectionRange(0, nextInput.value.length);
    }
  });

  onMonthChange = this.onValueChange('month', event => {
    if (event.target.selectionStart === 2) {
      const nextInput = this.inputRefs.year;
      nextInput.focus();
      nextInput.setSelectionRange(0, nextInput.value.length);
    }
  });

  onYearChange = this.onValueChange('year');

  setRef = (name) => (ref) => {
    this.inputRefs[name] = ref;
  };

  setDayRef = this.setRef('day');
  setMonthRef = this.setRef('month');
  setYearRef = this.setRef('year');

  render() {
    const { year, month, day } = this.state;

    return (
      <fieldset>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="bday-day"
          maxLength={2}
          placeholder="Jour"
          ref={this.setDayRef}
          value={day}
          onChange={this.onDayChange} />

        <input
          type="text"
          inputMode="numeric"
          autoComplete="bday-month"
          maxLength={2}
          placeholder="Mois"
          ref={this.setMonthRef}
          value={month}
          onChange={this.onMonthChange} />

        <input
          type="text"
          inputMode="numeric"
          autoComplete="bday-year"
          maxLength={4}
          placeholder="Année"
          ref={this.setYearRef}
          value={year}
          onChange={this.onYearChange} />
      </fieldset>
    );
  }

}
