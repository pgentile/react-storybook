import React from "react";

import BookingPassenger from "./BookingPassenger";

const defaultParams = {
  index: 0,
};

export default {
  title: "Booking form | BookingPassenger",
  component: BookingPassenger,
};

export const base = () => {
  return <BookingPassenger {...defaultParams} />;
};

export const nameStory = () => {
  return <BookingPassenger {...defaultParams} name="Jean Bon" />;
};
