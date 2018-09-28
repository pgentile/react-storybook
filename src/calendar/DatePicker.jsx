import React from "react";
import PropTypes from "prop-types";
import { parse, addMonths, format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import Calendar from "./Calendar";
import Button from "../buttons/Button";

import "./DatePicker.scss";

export default class DatePicker extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    viewDate: null
  };

  onChangeViewMonth = amount => {
    this.setState((prevState, props) => {
      const { value } = props;
      const { viewDate } = prevState;
      const currentDate = viewDate || value;
      const nextViewDate = addMonths(parse(currentDate), amount);

      return {
        viewDate: nextViewDate
      };
    });
  };

  onPreviousMonthClick = () => this.onChangeViewMonth(-1);

  onNextMonthClick = () => this.onChangeViewMonth(1);

  onTodayClick = () => {
    this.setState({
      viewDate: new Date()
    });
  };

  onSelect = date => {
    this.setState({
      viewDate: date
    });

    this.props.onChange(date);
  };

  render() {
    const { value, minDate, maxDate } = this.props;
    const { viewDate } = this.state;

    const parsedViewDate = parse(viewDate || value);

    return (
      <section className="date-picker">
        <div className="date-picker__previous-month-container">
          <Button onClick={this.onPreviousMonthClick} size="large" title="Mois précédent">
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </Button>
        </div>
        <div className="date-picker__calendar-container">
          <h1 className="date-picker__date">{format(parsedViewDate, "MMMM YYYY", { locale: frLocale })}</h1>
          <Calendar
            className="date-picker__calendar"
            viewDate={viewDate || value}
            selectedDate={value}
            minDate={minDate}
            maxDate={maxDate}
            onSelect={this.onSelect}
          />
        </div>
        <div className="date-picker__next-month-container">
          <Button onClick={this.onNextMonthClick} size="large" title="Mois suivant">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </div>
      </section>
    );
  }
}
