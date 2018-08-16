import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoucherForm from './VoucherForm';


const actions = {
  onAddVoucher: action('add voucher'),
  onCancel: action('cancel'),
};

const addVoucherWithFailure = async () => {
  return new Promise((resolve, reject) => {
    const error = new Error('Technical error');
    setTimeout(() => reject(error), 500);
  });
};


storiesOf('Payment / VoucherForm', module)
  .add('Défaut', () => {
    return (
      <VoucherForm {...actions} />
    );
  })
  .add('initial code', () => {
    return (
      <VoucherForm code="EURO2016" {...actions} />
    );
  })
  .add('submit error', () => {
    return (
      <VoucherForm
        code="CODE21"
        {...actions}
        onAddVoucher={addVoucherWithFailure} />
    );
  });
