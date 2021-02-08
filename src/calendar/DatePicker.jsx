import { useState } from "react";
import PropTypes from "prop-types";
import { parse, format, addMonths } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import Calendar from "./Calendar";
import Button from "../buttons/Button";

import "./DatePicker.scss";

export default function DatePicker({ value, minDate, maxDate, onChange }) {
  const [viewDate, setViewDate] = useState(() => {
    if (!value) {
      return format(new Date(), "yyyy-MM-dd");
    }
    return value;
  });

  const onChangeViewMonth = (amount) => {
    setViewDate((oldViewDate) => {
      const nextViewDate = addMonths(parse(oldViewDate, "yyyy-MM-dd", new Date()), amount);
      return format(nextViewDate, "yyyy-MM-dd");
    });
  };

  const onPreviousMonthClick = () => onChangeViewMonth(-1);

  const onNextMonthClick = () => onChangeViewMonth(1);

  const onSelect = (date) => {
    setViewDate(date);
    onChange(date);
  };

  return (
    <section className="date-picker">
      <div className="date-picker__previous-month-container">
        <Button onClick={onPreviousMonthClick} size="large" title="Mois précédent">
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </Button>
      </div>
      <div className="date-picker__calendar-container">
        <Calendar
          className="date-picker__calendar"
          viewDate={viewDate}
          selectedDate={value}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={onSelect}
        />
      </div>
      <div className="date-picker__next-month-container">
        <Button onClick={onNextMonthClick} size="large" title="Mois suivant">
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </Button>
      </div>
    </section>
  );
}

DatePicker.propTypes = {
  value: PropTypes.string,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
