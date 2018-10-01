import React from "react";
import PropTypes from "prop-types";
import {
  startOfMonth,
  startOfISOWeek,
  endOfMonth,
  endOfISOWeek,
  eachDay,
  format,
  isEqual,
  isBefore,
  isAfter,
  parse,
  isSameDay
} from "date-fns";
import memoizeOne from "memoize-one";

import bemModifiers from "../utils/bemModifiers";

import "./Calendar.scss";

export default class Calendar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    viewDate: PropTypes.any,
    selectedDate: PropTypes.any,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    className: ""
  };

  ref = React.createRef();

  focus() {
    if (this.ref.current) {
      const selectedDayElements = this.ref.current.getElementsByClassName("calendar__day--selected");
      if (selectedDayElements.length > 0) {
        selectedDayElements[0].focus();
      }
    }
  }

  generateDataMemoized = memoizeOne(monthFirstDay => {
    const monthLastDay = endOfMonth(monthFirstDay);
    const calendarFirstDay = startOfISOWeek(monthFirstDay);
    const calendarLastDay = endOfISOWeek(monthLastDay);

    const weeks = [];

    let count = 0;
    let days = [];

    eachDay(calendarFirstDay, calendarLastDay).forEach(date => {
      const day = {
        date,
        formattedDate: format(date, "YYYY-MM-DD"),
        dayNumber: format(date, "D"),
        currentMonth: !isBefore(date, monthFirstDay) && !isAfter(date, monthLastDay)
      };

      days.push(day);
      count++;

      if (count === 7) {
        weeks.push(days);
        count = 0;
        days = [];
      }
    });

    return weeks;
  });

  generateData(selectedDate) {
    const monthFirstDay = startOfMonth(selectedDate);
    return this.generateDataMemoized(monthFirstDay);
  }

  onCellClick = value => {
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  };

  onCellKeyPress = (event, value) => {
    if (event.key === "Enter" || event.key === " ") {
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
    }
  };

  render() {
    const {
      className,
      selectedDate: selectedDateInput,
      viewDate: viewDateInput,
      minDate: minDateInput,
      maxDate: maxDateInput,
      onSelect
    } = this.props;
    const selectedDate = parseDate(selectedDateInput);
    const viewDate = parseDateOrToday(viewDateInput);
    const minDate = parseDate(minDateInput);
    const maxDate = parseDate(maxDateInput);
    const isDateBetweenMinMax = dateBetween(minDate, maxDate);

    const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    const weekDayRows = weekDays.map(weekDay => {
      return (
        <th key={weekDay} className="calendar__week-day">
          <abbr className="calendar__week-day-abbr" title={weekDay}>
            {weekDay.substring(0, 2)}
          </abbr>
        </th>
      );
    });

    const rows = this.generateData(viewDate).map((weekDays, weekIndex) => {
      const columns = weekDays.map((day, dayIndex) => {
        const disabled = !isDateBetweenMinMax(day.date);
        const selectable = !!onSelect && !disabled;

        const dayClassName = bemModifiers("calendar__day", {
          "current-month": day.currentMonth,
          selectable: !!onSelect && !disabled,
          disabled,
          selected: selectedDate ? isSameDay(day.date, selectedDate) : false
        });
        return (
          <td
            key={dayIndex}
            className={dayClassName}
            onClick={selectable ? () => this.onCellClick(day.formattedDate) : null}
            onKeyPress={selectable ? event => this.onCellKeyPress(event, day.formattedDate) : null}
            role={!disabled ? "button" : null}
            tabIndex={!disabled ? 0 : null}
          >
            <time dateTime={day.formattedDate}>{day.dayNumber}</time>
          </td>
        );
      });

      return (
        <tr key={weekIndex} className="calendar__week">
          {columns}
        </tr>
      );
    });

    return (
      <table className={"calendar " + className} ref={this.ref}>
        <thead className="calendar__week-days">
          <tr>{weekDayRows}</tr>
        </thead>
        <tbody className="calendar__weeks">{rows}</tbody>
      </table>
    );
  }
}

function parseDate(date) {
  if (!date) {
    return null;
  }
  return parse(date);
}

function parseDateOrToday(date) {
  const parsed = parseDate(date);
  if (!parsed) {
    return new Date();
  }
  return date;
}

function dateBetween(minDate, maxDate) {
  if (minDate || maxDate) {
    const acceptMinDate = minDate ? date => isAfter(date, minDate) || isEqual(date, minDate) : alwaysTrue;
    const acceptMaxDate = maxDate ? date => isBefore(date, maxDate) || isEqual(date, maxDate) : alwaysTrue;
    return date => acceptMinDate(date) && acceptMaxDate(date);
  }
  return alwaysTrue;
}

function alwaysTrue() {
  return true;
}
