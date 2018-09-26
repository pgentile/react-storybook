import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Calendar from "./Calendar";

storiesOf("Calendar / Calendar", module)
  .add("main", () => {
    return <Calendar viewDate="2018-07-01" />;
  })
  .add("selected date", () => {
    return <Calendar viewDate="2018-07-01" selectedDate="2018-07-22" />;
  })
  .add("selectable", () => {
    return <Calendar viewDate="2018-07-01" onSelect={action("select")} />;
  })
  .add("min date", () => {
    return <Calendar minDate="2018-07-07" viewDate="2018-07-22" />;
  })
  .add("max date", () => {
    return <Calendar maxDate="2018-07-27" viewDate="2018-07-15" />;
  })
  .add("all options", () => {
    return (
      <Calendar
        minDate="2018-06-28"
        maxDate="2018-07-27"
        viewDate="2018-07-15"
        selectedDate="2018-07-23"
        onSelect={action("select")}
      />
    );
  });
