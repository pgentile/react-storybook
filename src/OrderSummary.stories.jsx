import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import OrderSummary from './OrderSummary';


class OrderSummaryDemo extends React.PureComponent {

  onCancel = id => {
    this.setState(state => {
      const items = state.items.filter(item => item.id !== id);
      return { items };
    });
  };

  state = {
    items: [
      {
        id: 'billets',
        label: 'Vos billets',
        price: {
          value: 109.80,
          currency: '€',
        },
      },
      {
        id: 'assurances',
        label: 'Vos assurances',
        price: {
          value: 5.90,
          currency: '€',
        },
      },
      {
        id: 'promo',
        label: (
          <Fragment>
            Code promotion <b>RADIN</b> appliqué
          </Fragment>
        ),
        price: {
          value: -10.0,
          currency: '€',
        },
        onCancel: () => {
          this.onCancel('promo');
        },
      },
      {
        id: 'don',
        label: (
          <Fragment>
            Votre don pour <b>Médecins sans frontières</b>
          </Fragment>
        ),
        price: {
          value: 1.0,
          currency: '€',
        },
        onCancel: () => {
          this.onCancel('don');
        },
      },
    ]
  };

  render() {
    const { items } = this.state;
    return (
      <OrderSummary items={items} />
    );
  }

}


storiesOf('OrderSummary', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <OrderSummaryDemo />
    );
  });
