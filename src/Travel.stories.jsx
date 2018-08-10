import React from 'react';

import { storiesOf } from '@storybook/react';

import Travel from './Travel';


const outwardTrip = {
  origin: 'Lille',
  destination: 'Nantes',
  departureDate: '12/09/2018 à 10h35',
};

const inwardTrip = {
  origin: 'Nantes',
  destination: 'Lille',
  departureDate: '14/09/2018 à 18h12',
};

const price = {
  value: 105.60,
  currency: '€',
};


storiesOf('Travel', module)
  .add('Aller simple', () => {
    return (
      <Travel outwardTrip={outwardTrip} passengerCount={1} price={price} />
    );
  })

  .add('Aller-retour', () => {
    return (
      <Travel outwardTrip={outwardTrip} inwardTrip={inwardTrip} passengerCount={2} price={price} />
    );
  })
