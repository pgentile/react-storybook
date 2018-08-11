import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import PaymentContainer from './PaymentContainer';


const items = [
  {
    id: 'billets',
    label: 'Vos billets',
    price: {
      value: 109.80,
      currency: '€',
    },
  },
  {
    id: 'assurances',
    label: 'Vos assurances',
    price: {
      value: 5.90,
      currency: '€',
    },
  }
];


storiesOf('PaymentContainer', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <PaymentContainer items={items} />
    );
  });
