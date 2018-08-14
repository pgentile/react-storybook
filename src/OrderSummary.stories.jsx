import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderSummary from './OrderSummary';


const cancelVoucher = action('cancel voucher');
const cancelDonation = action('cancel donation');

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
  onCancel: cancelVoucher,
};

const donationItem = {
  id: 'donation',
  type: 'DONATION',
  label: 'Votre don',
  price: {
    value: 1.0,
    currency: '€',
  },
  donationDetails: {
    code: 'code',
    association: 'Médecins sans frontières',
  },
  onCancel: cancelDonation,
};


storiesOf('Payment / OrderSummary', module)
  .add('Billets uniquement', () => {
    return (
      <OrderSummary items={[billetsItem]} />
    );
  })
  .add('Billets & assurances', () => {
    return (
      <OrderSummary items={[billetsItem, assurancesItem]} />
    );
  })
  .add('Avec un code promo', () => {
    return (
      <OrderSummary items={[billetsItem, voucherItem, assurancesItem]} />
    );
  })
  .add('Avec un don', () => {
    return (
      <OrderSummary items={[billetsItem, donationItem]} />
    );
  })
  .add('Tous les types', () => {
    return (
      <OrderSummary items={[billetsItem, voucherItem, assurancesItem, donationItem]} />
    );
  });
