import React from "react";
import { storiesOf } from "@storybook/react";

import BookingPassengerList from "./BookingPassengerList";

const passengers = [
  {
    id: "1",
    name: "Jean Bon"
  },
  {
    id: "2",
    name: "Debbie Loss"
  },
  {
    id: "3"
  }
];

storiesOf("Booking form | BookingPassengerList", module).add("main", () => {
  return <BookingPassengerList passengers={passengers} />;
});
