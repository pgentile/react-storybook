import React from "react";
import PropTypes from "prop-types";

import BookingPassenger from "./BookingPassenger";
import bemModifiers from "../utils/bemModifiers";

import "./BookingPassengerList.scss";

export default function BookingPassengerList({ as: Element = "section", className = "", passengers }) {
  const passengerElements = passengers.map((passenger, index) => {
    const className = bemModifiers("booking-passenger-list__passenger", {
      even: (index + 1) % 2 == 0,
    });
    return <BookingPassenger key={passenger.id} className={className} index={index} name={passenger.name} />;
  });

  return <Element className={"booking-passenger-list " + className}>{passengerElements} </Element>;
}

BookingPassengerList.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  passengers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};
