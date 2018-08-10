import React from 'react';
import PropTypes from 'prop-types';

import Price from './Price';

import './Travel.scss';


const tripPropShape = PropTypes.shape({
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
});


const amountPropShape = PropTypes.shape({
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
})


export default class Travel extends React.PureComponent {

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
        <div className="travel__title-container">
          <TravelTitle
            origin={outwardTrip.origin}
            destination={outwardTrip.destination}
            roundtrip={!!inwardTrip} />
        </div>
        <div className="travel__dates-container">
          <TravelDates
            outwardDepartureDate={outwardTrip.departureDate}
            inwardDepartureDate={inwardTrip && inwardTrip.departureDate} />
        </div>
        <div className="travel__passengers-container">
          <TravelPassengers passengerCount={passengerCount} />
        </div>
        <div className="travel__price-container">
          <Price {...price} />
        </div>
      </section>
    );
  }

}


class TravelTitle extends React.PureComponent {

  static propTypes = {
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    roundtrip: PropTypes.bool.isRequired,
  };

  render() {
    const { origin, destination, roundtrip } = this.props;
    const separator = roundtrip ? '⇄' : '→';

    return (
      <h1 className="travel__title">
        {`${origin} ${separator} ${destination}`}
      </h1>
    );
  }

}


class TravelDates extends React.PureComponent {

  static propTypes = {
    outwardDepartureDate: PropTypes.string.isRequired,
    inwardDepartureDate: PropTypes.string,
  };

  render() {
    const { outwardDepartureDate, inwardDepartureDate } = this.props;

    return (
      <div className="travel__dates">
        <h2 className="travel__outward-date">Aller le <b>{outwardDepartureDate}</b></h2>
        {inwardDepartureDate && <h2 className="travel__inward-date">Retour le <b>{inwardDepartureDate}</b></h2>}
      </div>
    );
  }

}


class TravelPassengers extends React.PureComponent {

  static propTypes = {
    passengerCount: PropTypes.number.isRequired,
  };

  render() {
    const { passengerCount } = this.props;
    const dimension = passengerCount === 1 ? 'passager' : 'passagers';

    return (
      <h2 className="travel__passengers">
        {passengerCount} {dimension}
      </h2>
    );
  }

}
