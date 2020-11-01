import { action } from "@storybook/addon-actions";

import Calendar from "./Calendar";

export default {
  title: "Calendar / Calendar",
  component: Calendar,
};

export const main = () => {
  return <Calendar viewDate="2018-07-01" />;
};

export const selectedDate = () => {
  return <Calendar viewDate="2018-07-01" selectedDate="2018-07-22" />;
};

export const selectable = () => {
  return <Calendar viewDate="2018-07-01" onSelect={action("select")} />;
};

export const minDate = () => {
  return <Calendar minDate="2018-07-07" viewDate="2018-07-22" />;
};

export const maxDate = () => {
  return <Calendar maxDate="2018-07-27" viewDate="2018-07-15" />;
};

export const allOptions = () => {
  return (
    <Calendar
      minDate="2018-06-28"
      maxDate="2018-07-27"
      viewDate="2018-07-15"
      selectedDate="2018-07-23"
      onSelect={action("select")}
    />
  );
};
