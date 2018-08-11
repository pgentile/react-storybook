import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Price from './Price';
import bemModifiers from './bemModifiers';

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
    grid: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    grid: false,
  };

  render() {
    const { outwardTrip, inwardTrip, passengerCount, price, grid } = this.props;

    const className = bemModifiers('travel', {
      grid,
    });

    return (
      <section className={className}>
        <div className="travel__title-container">
          <TravelTitle
            outwardTrip={outwardTrip}
            inwardTrip={inwardTrip} />
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
    outwardTrip: tripPropShape.isRequired,
    inwardTrip: tripPropShape,
  };

  render() {
    const { outwardTrip, inwardTrip } = this.props;
    const roundtrip = !!inwardTrip;
    const symetricalRountrip = roundtrip && isSymetricalRountrip(outwardTrip, inwardTrip);
    const asymetricalRountrip = roundtrip && !symetricalRountrip;

    const separator = symetricalRountrip ? '⇄' : '➝';

    const titleClass = bemModifiers('travel__title', {
      'asymetrical-roundtrip': asymetricalRountrip,
    });

    return (
      <Fragment>
        <h1 className={titleClass}>
          {`${outwardTrip.origin} ${separator} ${outwardTrip.destination}`}
        </h1>
        {asymetricalRountrip && <h1 className={titleClass}>
          {`${inwardTrip.origin} ${separator} ${inwardTrip.destination}`}
        </h1>}
      </Fragment>
    );
  }

}


function isSymetricalRountrip(outwardTrip, inwardTrip) {
  if (!inwardTrip) {
    return false;
  }
  return outwardTrip.origin === inwardTrip.destination && outwardTrip.destination === inwardTrip.origin;
}


class TravelDates extends React.PureComponent {

  static propTypes = {
    outwardDepartureDate: PropTypes.string.isRequired,
    inwardDepartureDate: PropTypes.string,
  };

  render() {
    const { outwardDepartureDate, inwardDepartureDate } = this.props;

    return (
      <Fragment>
        {!inwardDepartureDate && <h2 className="travel__date">Départ le <b>{outwardDepartureDate}</b></h2>}
        {inwardDepartureDate && <h2 className="travel__date">Aller le <b>{outwardDepartureDate}</b></h2>}
        {inwardDepartureDate && <h2 className="travel__date">Retour le <b>{inwardDepartureDate}</b></h2>}
      </Fragment>
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
        {passengerCount}&nbsp;{dimension}
      </h2>
    );
  }

}
