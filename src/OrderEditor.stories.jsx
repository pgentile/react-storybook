import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderEditor from './OrderEditor';


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
  },
];


storiesOf('OrderEditor', module)
  .add('main', () => {
    return (
      <OrderEditor
        items={items}
        onAddVoucher={action('add voucher')}
        onAddDonation={action('add donation')} />
    );
  });
