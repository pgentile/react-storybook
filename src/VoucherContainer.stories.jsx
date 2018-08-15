import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoucherContainer from './VoucherContainer';


storiesOf('Payment / VoucherContainer', module)
  .add('main', () => {
    return (
      <VoucherContainer
        onAddVoucher={action('add voucher')} />
    );
  });
