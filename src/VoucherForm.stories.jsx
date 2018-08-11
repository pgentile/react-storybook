import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoucherForm from './VoucherForm';


storiesOf('Payment / VoucherForm', module)
  .add('main', () => {
    return (
      <VoucherForm onAddVoucher={action('add voucher')} />
    );
  });
