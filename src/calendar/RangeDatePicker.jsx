import { isBefore } from "date-fns";
import { useState } from "react";

import DatePicker from "./DatePicker";
import { parseFromString } from "./utils";

import "./RangeDatePicker.scss";

export default function RangeDatePicker() {
  const [leftDate, setLeftDate] = useState();
  const [rightDate, setRightDate] = useState();

  const handleLeftDateChange = (date) => {
    setLeftDate(date);

    if (rightDate) {
      const parsedDate = parseFromString(date);
      const parsedRightDate = parseFromString(rightDate);

      if (isBefore(parsedRightDate, parsedDate)) {
        setRightDate(null);
      }
    }
  };

  const handleRightDateChange = (date) => {
    setRightDate(date);
  };

  return (
    <div className="range-date-picker">
      <div className="range-date-picker__left">
        <DatePicker value={leftDate} onChange={handleLeftDateChange} />
      </div>
      <div className="range-date-picker__right">
        <DatePicker value={rightDate} minDate={leftDate} onChange={handleRightDateChange} />
      </div>
    </div>
  );
}

RangeDatePicker.propTypes = {};
