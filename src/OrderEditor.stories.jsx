import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderEditor from './OrderEditor';


const billetsItem = {
  id: 'billets',
  label: 'Vos billets',
  price: {
    value: 109.80,
    currency: '€',
  },
};

const assurancesItem = {
  id: 'assurances',
  label: 'Vos assurances',
  price: {
    value: 5.90,
    currency: '€',
  },
};

const voucherItem = {
  id: 'voucher',
  type: 'VOUCHER',
  label: 'Votre code promotion',
  price: {
    value: -2.0,
    currency: '€',
  },
};


storiesOf('Payment / OrderEditor', module)
  .add('Billets uniquement', () => {
    return (
      <OrderEditor
        items={[billetsItem]}
        onAddVoucher={action('add voucher')}
        onAddDonation={action('add donation')} />
    );
  })
  .add('Billets & assurances', () => {
    return (
      <OrderEditor
        items={[billetsItem, assurancesItem]}
        onAddVoucher={action('add voucher')}
        onAddDonation={action('add donation')} />
    );
  })
  .add('Avec un code promo', () => {
    return (
      <OrderEditor
        items={[billetsItem, voucherItem, assurancesItem]}
        onAddVoucher={action('add voucher')}
        onAddDonation={action('add donation')} />
    );
  });
