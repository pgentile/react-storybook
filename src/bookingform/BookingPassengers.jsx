import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import BookingPassengerList from "./BookingPassengerList";
import Button from "../buttons/Button";

import "./BookingPassengers.scss";

const PASSENGER_LIMIT = 9;

export default function BookingPassengers({ as: Element = "section", initialPassengers }) {
  const [passengers, setPassengers] = useState(initialPassengers);

  const addPassenger = () => {
    const newPassenger = {
      id: `new-pax-${passengers.length + 1}`
    };
    const newPassengers = [...passengers, newPassenger];
    setPassengers(newPassengers);
  };

  const removeLastPassenger = () => {
    const newPassengers = passengers.slice(0, -1);
    setPassengers(newPassengers);
  };

  const overPassengerLimit = passengers.length > PASSENGER_LIMIT;

  return (
    <Element className="booking-passengers">
      <div className="booking-passengers__controls">
        <Fragment>
          {overPassengerLimit ? `${passengers.length} passagers et +` : `${passengers.length} passager(s)`}
        </Fragment>
        <Fragment> </Fragment>
        <Button onClick={addPassenger} disabled={overPassengerLimit}>
          Ajouter un passager
        </Button>
        <Fragment> </Fragment>
        <Button onClick={removeLastPassenger} disabled={passengers.length <= 1}>
          Supprimer un passager
        </Button>
      </div>
      {!overPassengerLimit && <BookingPassengerList className="booking-passengers__list" passengers={passengers} />}
      {overPassengerLimit && (
        <p className="booking-passengers__overlimit">
          {passengers.length} passagers et + voyagent en même temps&nbsp;?{" "}
          <strong>Faites une réservation de groupe</strong>
        </p>
      )}
    </Element>
  );
}

BookingPassengers.propTypes = {
  as: PropTypes.elementType,
  initialPassengers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ).isRequired
};
