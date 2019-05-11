import React from "react";
import { storiesOf } from "@storybook/react";

import BookingPassengers from "./BookingPassengers";

const initialPassengers = [
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
  },
  {
    id: "4",
    name: "Guy Gnol"
  },
  {
    id: "5"
  }
];

storiesOf("Booking form | BookingPassengers", module).add("main", () => {
  return <BookingPassengers initialPassengers={initialPassengers} />;
});
