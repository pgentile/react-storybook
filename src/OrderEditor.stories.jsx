import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderEditor from './OrderEditor';


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


const onActions = {
  onAddVoucher: action('add voucher'),
  onCancelVoucher: cancelVoucher,
  onAddDonation: action('add donation'),
  onCancelDonation: cancelDonation,
};


storiesOf('Payment / OrderEditor', module)
  .add('Billets uniquement', () => {
    return (
      <OrderEditor
        items={[billetsItem]}
        {...onActions} />
    );
  })
  .add('Billets & assurances', () => {
    return (
      <OrderEditor
        items={[billetsItem, assurancesItem]}
        {...onActions} />
    );
  })
  .add('Avec un code promo', () => {
    return (
      <OrderEditor
        items={[billetsItem, voucherItem, assurancesItem]}
        {...onActions} />
    );
  })
  .add('Avec un don', () => {
    return (
      <OrderEditor
        items={[billetsItem, donationItem]}
        {...onActions} />
    );
  });
