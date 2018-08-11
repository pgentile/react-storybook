import React from 'react';
import { storiesOf } from '@storybook/react';

import VoucherForm from './VoucherForm';


function onAddVoucher() {

}

storiesOf('VoucherForm', module)
  .add('main', () => {
    return (
      <VoucherForm onAddVoucher={onAddVoucher} />
    );
  });
