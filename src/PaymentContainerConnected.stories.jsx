import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import PaymentContainerConnected from './PaymentContainerConnected';
import { createStore } from './redux/store';

import * as payment from './redux/reducers/payment';


storiesOf('Payment / PaymentContainerConnected', module)
  .addDecorator(story => {
    const store = createStore();
    store.dispatch(payment.loadItems([
      {
        id: 'billets',
        label: 'Vos billets',
        price: {
          value: 55.60,
          currency: '€',
        },
      },
    ]));

    return (
      <Provider store={store}>
        {story()}
      </Provider>
    );
  })
  .add('main', () => {
    return (
      <PaymentContainerConnected />
    );
  });
