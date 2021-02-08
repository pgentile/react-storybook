import { action } from "@storybook/addon-actions";

import Calendar from "./Calendar";

export default {
  title: "Calendar / Calendar",
  component: Calendar,
};

function Story({ ...args }) {
  return <Calendar {...args} />;
}

export const Main = Story.bind({});

Main.args = {
  viewDate: "2018-07-01",
};

export const SelectedDate = Story.bind({});

SelectedDate.args = {
  viewDate: "2018-07-01",
  selectedDate: "2018-07-22",
};

export const Selectable = Story.bind({});

Selectable.args = {
  viewDate: "2018-07-01",
  onSelect: action("select"),
};

export const MinDate = Story.bind({});

MinDate.args = {
  viewDate: "2018-07-22",
  minDate: "2018-07-07",
};

export const MaxDate = Story.bind({});

MaxDate.args = {
  viewDate: "2018-07-15",
  maxDate: "2018-07-27",
};

export const AllOptions = Story.bind({});

AllOptions.args = {
  viewDate: "2018-07-15",
  selectedDate: "2018-07-23",
  minDate: "2018-06-28",
  maxDate: "2018-07-27",
  onSelect: action("select"),
};
