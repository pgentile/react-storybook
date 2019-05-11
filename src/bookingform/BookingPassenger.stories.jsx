import React from "react";
import { storiesOf } from "@storybook/react";

import BookingPassenger from "./BookingPassenger";

const defaultParams = {
  index: 0
};

storiesOf("Booking form | BookingPassenger", module)
  .add("base", () => {
    return <BookingPassenger {...defaultParams} />;
  })
  .add("name", () => {
    return <BookingPassenger {...defaultParams} name="Jean Bon" />;
  });
