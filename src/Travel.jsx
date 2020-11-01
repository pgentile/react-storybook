import { PureComponent } from "react";
import PropTypes from "prop-types";

import Price from "./Price";
import bemModifiers from "./utils/bemModifiers";

import "./Travel.scss";

const tripPropShape = PropTypes.shape({
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
});

const amountPropShape = PropTypes.shape({
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
});

export default class Travel extends PureComponent {
  static propTypes = {
    outwardTrip: tripPropShape.isRequired,
    inwardTrip: tripPropShape,
    passengerCount: PropTypes.number.isRequired,
    price: amountPropShape.isRequired,
  };

  render() {
    const { outwardTrip, inwardTrip, passengerCount, price } = this.props;

    return (
      <section className="travel">
        <TravelHeader outwardTrip={outwardTrip} inwardTrip={inwardTrip} price={price} />
        <TravelDetails
          outwardDepartureDate={outwardTrip.departureDate}
          inwardDepartureDate={inwardTrip && inwardTrip.departureDate}
          passengerCount={passengerCount}
        />
      </section>
    );
  }
}

class TravelHeader extends PureComponent {
  static propTypes = {
    outwardTrip: tripPropShape.isRequired,
    inwardTrip: tripPropShape,
    price: amountPropShape.isRequired,
  };

  render() {
    const { outwardTrip, inwardTrip, price } = this.props;

    return (
      <div className="travel__header">
        <TravelTitle outwardTrip={outwardTrip} inwardTrip={inwardTrip} />
        <Price as="p" className="travel__header-price" price={price} />
      </div>
    );
  }
}

class TravelTitle extends PureComponent {
  static propTypes = {
    outwardTrip: tripPropShape.isRequired,
    inwardTrip: tripPropShape,
  };

  render() {
    const { outwardTrip, inwardTrip } = this.props;
    const roundtrip = !!inwardTrip;
    const symetricalRountrip = roundtrip && isSymetricalRountrip(outwardTrip, inwardTrip);
    const asymetricalRountrip = roundtrip && !symetricalRountrip;

    const separator = symetricalRountrip ? "⇄" : "➝";

    const titleClass = bemModifiers("travel__header-title", {
      "asymetrical-roundtrip": asymetricalRountrip,
    });

    return (
      <h1 className={titleClass}>
        {`${outwardTrip.origin} ${separator} ${outwardTrip.destination}`}
        {asymetricalRountrip && ` ● ${inwardTrip.origin} ${separator} ${inwardTrip.destination}`}
      </h1>
    );
  }
}

class TravelDetails extends PureComponent {
  static propTypes = {
    outwardDepartureDate: PropTypes.string.isRequired,
    inwardDepartureDate: PropTypes.string,
    passengerCount: PropTypes.number.isRequired,
  };

  render() {
    const { outwardDepartureDate, inwardDepartureDate, passengerCount } = this.props;
    const dimension = passengerCount === 1 ? "passager" : "passagers";

    return (
      <div className="travel__details">
        {!inwardDepartureDate && (
          <h2 className="travel__details-date">
            Départ le <b>{outwardDepartureDate}</b>
          </h2>
        )}
        {inwardDepartureDate && (
          <h2 className="travel__details-date">
            Aller le <b>{outwardDepartureDate}</b>
          </h2>
        )}
        {inwardDepartureDate && (
          <h2 className="travel__details-date">
            Retour le <b>{inwardDepartureDate}</b>
          </h2>
        )}
        <p className="travel__details-passengers">
          {passengerCount}
          &nbsp;
          {dimension}
        </p>
      </div>
    );
  }
}

function isSymetricalRountrip(outwardTrip, inwardTrip) {
  if (!inwardTrip) {
    return false;
  }
  return outwardTrip.origin === inwardTrip.destination && outwardTrip.destination === inwardTrip.origin;
}
