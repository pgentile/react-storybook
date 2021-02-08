import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  startOfMonth,
  startOfISOWeek,
  endOfMonth,
  endOfISOWeek,
  eachDayOfInterval,
  format,
  isEqual,
  isBefore,
  isAfter,
  parse,
  isSameDay,
} from "date-fns";
import frLocale from "date-fns/locale/fr";

import bemModifiers from "../utils/bemModifiers";

import "./Calendar.scss";

export default function Calendar({
  className = "",
  selectedDate: selectedDateInput,
  viewDate: viewDateInput,
  minDate: minDateInput,
  maxDate: maxDateInput,
  onSelect,
}) {
  const selectedDate = parseDate(selectedDateInput);
  const viewDate = parseDateOrToday(viewDateInput);
  const minDate = parseDate(minDateInput);
  const maxDate = parseDate(maxDateInput);
  const isDateBetweenMinMax = dateBetween(minDate, maxDate);

  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const weekDayRows = weekDays.map((weekDay) => {
    return (
      <th key={weekDay} className="calendar__week-day">
        <abbr className="calendar__week-day-abbr" title={weekDay}>
          {weekDay.substring(0, 2)}
        </abbr>
      </th>
    );
  });

  const monthFirstDay = useMemo(() => startOfMonth(viewDate), [viewDate]);

  const weeksTable = useMemo(() => {
    const monthLastDay = endOfMonth(monthFirstDay);
    const calendarFirstDay = startOfISOWeek(monthFirstDay);
    const calendarLastDay = endOfISOWeek(monthLastDay);

    const weeks = [];

    let count = 0;
    let days = [];

    eachDayOfInterval({ start: calendarFirstDay, end: calendarLastDay }).forEach((date) => {
      const day = {
        date,
        formattedDate: format(date, "yyyy-MM-dd"),
        label: format(date, "EEEE d MMMM yyyy", { locale: frLocale }),
        dayNumber: format(date, "d"),
        currentMonth: !isBefore(date, monthFirstDay) && !isAfter(date, monthLastDay),
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
  }, [monthFirstDay]);

  const onCellClick = (value) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  const onCellKeyPress = (event, value) => {
    if (event.key === "Enter" || event.key === " ") {
      if (onSelect) {
        onSelect(value);
      }
    }
  };

  const rows = weeksTable.map((weekDays, weekIndex) => {
    const columns = weekDays.map((day) => {
      const disabled = !isDateBetweenMinMax(day.date);
      const selectable = !!onSelect && !disabled;
      const sameDate = isSameDay(day.date, selectedDate);

      const dayClassName = bemModifiers("calendar__day", {
        "current-month": day.currentMonth,
        selectable: !!onSelect && !disabled,
        disabled,
        selected: selectedDate ? sameDate : false,
      });
      return (
        <td
          key={day.formattedDate}
          className={dayClassName}
          onClick={selectable ? () => onCellClick(day.formattedDate) : null}
          onKeyPress={selectable ? (event) => onCellKeyPress(event, day.formattedDate) : null}
          role="gridcell"
          tabIndex={!disabled && selectable ? 0 : null}
          aria-current={sameDate ? "date" : null}
          aria-label={day.label}
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
    <table className={"calendar " + className} role="grid">
      <caption className="calendar__month">{format(viewDate, "LLLL yyyy", { locale: frLocale })}</caption>
      <thead className="calendar__week-days">
        <tr>{weekDayRows}</tr>
      </thead>
      <tbody className="calendar__weeks">{rows}</tbody>
    </table>
  );
}

Calendar.propTypes = {
  className: PropTypes.string,
  viewDate: PropTypes.string,
  selectedDate: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onSelect: PropTypes.func,
};

function parseDate(date) {
  if (!date) {
    return null;
  }
  return parse(date, "yyyy-MM-dd", new Date());
}

function parseDateOrToday(date) {
  const parsed = parseDate(date);
  if (!parsed) {
    return new Date();
  }
  return parsed;
}

function dateBetween(minDate, maxDate) {
  if (minDate || maxDate) {
    const acceptMinDate = minDate ? (date) => isAfter(date, minDate) || isEqual(date, minDate) : alwaysTrue;
    const acceptMaxDate = maxDate ? (date) => isBefore(date, maxDate) || isEqual(date, maxDate) : alwaysTrue;
    return (date) => acceptMinDate(date) && acceptMaxDate(date);
  }
  return alwaysTrue;
}

function alwaysTrue() {
  return true;
}
