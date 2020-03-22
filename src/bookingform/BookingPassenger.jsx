import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./BookingPassenger.scss";

export default function BookingPassenger({ as: Element = "section", className = "", index, name }) {
  return (
    <Element className={"booking-passenger " + className}>
      <h1 className="booking-passenger__title">
        <FontAwesomeIcon icon={faUser} /> Passager n°{index + 1}{" "}
        {name && <span className="booking-passenger__name">&mdash;&nbsp;{name}</span>}
      </h1>
      <div className="booking-passenger__spec">
        <p className="booking-passenger__age">Âge</p>
        <p className="booking-passenger__fare-profile">Profil tarifaire</p>
      </div>
    </Element>
  );
}

BookingPassenger.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
};
