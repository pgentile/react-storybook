import React from 'react';
import { storiesOf } from '@storybook/react';

import PaymentRequestComponent from './PaymentRequestComponent';


storiesOf('PaymentRequestComponent', module)
  .add('main', () => {
    return (
      <PaymentRequestComponent />
    );
  });
