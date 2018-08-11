import React from 'react';
import PropTypes from 'prop-types';

import OrderSummary from './OrderSummary';
import Card from './Card';
import Wip from './Wip';

import './PaymentContainer.scss';


export default class PaymentContainer extends React.PureComponent {

  static propTypes = {
    items: OrderSummary.propTypes.items,
  };

  render() {
    const { items } = this.props;

    return (
      <section className="payment-container">
        <Card className="payment-container__order-summary" layer="raised">
          <OrderSummary items={items} />
        </Card>
        <div className="payment-container__form">
          <Wip>Ici, il y aura le formulaire de paiement</Wip>
        </div>
      </section>
    );
  }

}
