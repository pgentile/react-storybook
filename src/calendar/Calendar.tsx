import { useMemo, useRef, useCallback, ReactElement, KeyboardEvent } from "react";
import { string, func } from "prop-types";
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
  isSameDay,
  addDays,
} from "date-fns";
import frLocale from "date-fns/locale/fr";

import { ISODate, formatToString, parseFromString } from "./utils";
import bemModifiers from "../utils/bemModifiers";

import "./Calendar.scss";

type CalendarProps = {
  className?: string;
  selectedDate?: ISODate;
  viewDate?: ISODate;
  minDate?: ISODate;
  maxDate?: ISODate;
  onSelect?: (selectedDate: ISODate) => void;
};

export default function Calendar({
  className = "",
  selectedDate: selectedDateInput,
  viewDate: viewDateInput,
  minDate: minDateInput,
  maxDate: maxDateInput,
  onSelect,
}: CalendarProps): ReactElement {
  const selectedDate = useMemo(
    () => (selectedDateInput ? parseFromString(selectedDateInput) : null),
    [selectedDateInput]
  );
  const viewDate = useMemo(() => (viewDateInput ? parseFromString(viewDateInput) : new Date()), [viewDateInput]);
  const minDate = useMemo(() => (minDateInput ? parseFromString(minDateInput) : null), [minDateInput]);
  const maxDate = useMemo(() => (maxDateInput ? parseFromString(maxDateInput) : null), [maxDateInput]);
  const isDateBetweenMinMax = useMemo(() => dateBetween(minDate, maxDate), [minDate, maxDate]);

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

    type Day = {
      date: Date;
      formattedDate: ISODate;
      label: string;
      dayNumber: string;
      currentMonth: boolean;
    };

    const weeks: Day[][] = [];

    let count = 0;
    let days: Day[] = [];

    eachDayOfInterval({ start: calendarFirstDay, end: calendarLastDay }).forEach((date) => {
      const day: Day = {
        date,
        formattedDate: formatToString(date),
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

  const tableRef = useRef<HTMLTableElement>(null);

  const handleGridKeyDown = useCallback((event: KeyboardEvent) => {
    const keysToHandle: { [key: string]: number } = {
      ArrowUp: -7,
      ArrowDown: 7,
      ArrowLeft: -1,
      ArrowRight: 1,
    };

    const modifierEnabled = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    if (keysToHandle[event.key] && !modifierEnabled) {
      event.preventDefault();

      const table = tableRef.current;
      if (table) {
        const focusElement = table.querySelector<HTMLTableDataCellElement>('td[role="gridcell"]:focus');
        if (focusElement?.dataset?.date) {
          const daysShift = keysToHandle[event.key];
          const parsedCurrentDate = parseFromString(focusElement.dataset.date);
          const targetDate = addDays(parsedCurrentDate, daysShift);

          const targetElement = table.querySelector<HTMLTableDataCellElement>(
            `td[role="gridcell"][data-date="${formatToString(targetDate)}"]`
          );
          targetElement?.focus();
        }
      }
    }
  }, []);

  const handleCellClick = (value: ISODate) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  const handleCellKeyDown = (event: KeyboardEvent, value: ISODate) => {
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
      const sameDate = selectedDate ? isSameDay(day.date, selectedDate) : false;

      const dayClassName = bemModifiers("calendar__day", {
        "current-month": day.currentMonth,
        selectable: Boolean(onSelect && !disabled),
        disabled,
        selected: sameDate,
      });
      return (
        <td
          key={day.formattedDate}
          className={dayClassName}
          onClick={selectable ? () => handleCellClick(day.formattedDate) : undefined}
          onKeyDown={selectable ? (event) => handleCellKeyDown(event, day.formattedDate) : undefined}
          role="gridcell"
          tabIndex={!disabled && selectable ? 0 : undefined}
          aria-current={sameDate ? "date" : undefined}
          aria-label={day.label}
          data-date={day.formattedDate}
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
    <table
      className={"calendar " + className}
      role="grid"
      onKeyDown={onSelect ? handleGridKeyDown : undefined}
      ref={tableRef}
    >
      <caption className="calendar__month">{format(viewDate, "LLLL yyyy", { locale: frLocale })}</caption>
      <thead className="calendar__week-days">
        <tr>{weekDayRows}</tr>
      </thead>
      <tbody className="calendar__weeks">{rows}</tbody>
    </table>
  );
}

Calendar.propTypes = {
  className: string,
  viewDate: string,
  selectedDate: string,
  minDate: string,
  maxDate: string,
  onSelect: func,
};

function dateBetween(minDate: Date | null, maxDate: Date | null): (date: Date) => boolean {
  if (minDate || maxDate) {
    const acceptMinDate = minDate ? (date: Date) => isAfter(date, minDate) || isEqual(date, minDate) : alwaysTrue;
    const acceptMaxDate = maxDate ? (date: Date) => isBefore(date, maxDate) || isEqual(date, maxDate) : alwaysTrue;
    return (date: Date) => acceptMinDate(date) && acceptMaxDate(date);
  }
  return alwaysTrue;
}

function alwaysTrue(): boolean {
  return true;
}
