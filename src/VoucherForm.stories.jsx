import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoucherForm from './VoucherForm';


const actions = {
  onAddVoucher: action('add voucher'),
  onCancel: action('cancel'),
};


storiesOf('Payment / VoucherForm', module)
  .add('Défaut', () => {
    return (
      <VoucherForm {...actions} />
    );
  })
  .add('initial code', () => {
    return (
      <VoucherForm isInitialValid code="EURO2016" {...actions} />
    );
  })
  .add('submit success', () => {
    return (
      <VoucherForm
        isInitialValid
        code="CODE21"
        {...actions}
        onAddVoucher={addVoucherWithSuccess} />
    );
  })
  .add('submit error', () => {
    return (
      <VoucherForm
        isInitialValid
        code="CODE21"
        {...actions}
        onAddVoucher={addVoucherWithFailure} />
    );
  });


const addVoucherWithSuccess = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });
};

const addVoucherWithFailure = async () => {
  return new Promise((resolve, reject) => {
    const error = new Error('Technical error');
    setTimeout(() => reject(error), 500);
  });
};
