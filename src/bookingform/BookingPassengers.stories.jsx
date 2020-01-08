import React from "react";

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

export default {
  title: "Booking form | BookingPassengers",
  component: BookingPassengers
};

export const main = () => {
  return <BookingPassengers initialPassengers={initialPassengers} />;
};
