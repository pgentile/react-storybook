import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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


storiesOf('Payment / PaymentContainer', module)
  .add('main', () => {
    return (
      <PaymentContainer
        items={items}
        onAddVoucher={action('add voucher')}
        onCancelVoucher={action('cancel voucher')}
        onAddDonation={action('add donation')}
        onCancelDonation={action('cancel donation')} />
    );
  });
