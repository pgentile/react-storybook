import React from "react";

import BookingPassengerList from "./BookingPassengerList";

const passengers = [
  {
    id: "1",
    name: "Jean Bon",
  },
  {
    id: "2",
    name: "Debbie Loss",
  },
  {
    id: "3",
  },
];

export default {
  title: "Booking form / BookingPassengerList",
  component: BookingPassengerList,
};

export const main = () => {
  return <BookingPassengerList passengers={passengers} />;
};
