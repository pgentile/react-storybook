import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderSummary from './OrderSummary';


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
    id: 'voucher',
    label: (
      <Fragment>
        Code promotion <b>RADIN</b> appliqué
      </Fragment>
    ),
    price: {
      value: -10.0,
      currency: '€',
    },
    onCancel: action('cancel voucher'),
  },
  {
    id: 'assurances',
    label: 'Vos assurances',
    price: {
      value: 5.90,
      currency: '€',
    },
  },
  {
    id: 'donation',
    label: (
      <Fragment>
        Votre don pour <b>Médecins sans frontières</b>
      </Fragment>
    ),
    price: {
      value: 1.0,
      currency: '€',
    },
    onCancel: action('cancel donation'),
  },
];

storiesOf('OrderSummary', module)
  .add('main', () => {
    return (
      <OrderSummary items={items}/>
    );
  });
