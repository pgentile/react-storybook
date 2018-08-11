import React from 'react';
import PropTypes from 'prop-types';

import Price from './Price';

import './OrderSummary.scss';


const pricePropType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
});


export const orderItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  price: pricePropType.isRequired,
  onCancel: PropTypes.func,
});


export default class OrderSummary extends React.PureComponent {

  static propTypes = {
    items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired,
  };

  render() {
    const { items } = this.props;
    const totalPrice = computeTotalPrice(items.map(item => item.price));

    return (
      <section className="order-summary">
        <OrderSummaryDetails items={items} />
        <div className="order-summary__separator" />
        <OrderSummaryTotal totalPrice={totalPrice} />
      </section>
    );
  }

}


function computeTotalPrice(prices) {
  if (prices.length === 0) {
    return {
      value: 0,
      currency: '€',
    };
  }

  return {
    value: prices.map(price => price.value).reduce((left, right) => left + right, 0),
    currency: prices[0].currency,
  };
}


class OrderSummaryDetails extends React.PureComponent {

  static propTypes = {
    items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired,
  };

  render() {
    const { items } = this.props;

    const itemElements = items.map(item => {
      return <OrderSummaryItem key={item.id} {...item} />;
    });

    return (
      <ul className="order-summary__details">
        {itemElements}
      </ul>
    );
  }

}


class OrderSummaryItem extends React.PureComponent {

  static propTypes = {
    ...orderItemPropType,
  };

  onCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { label, price, onCancel } = this.props;
    return (
      <li className="order-summary__item">
        <span className="order-summary__item-label">
          {label}
          {onCancel && <a className="order-summary__item-cancel" href="#" onClick={this.onCancel}>
            Supprimer
          </a>}
        </span>
        <Price className="order-summary__item-price" {...price} />
      </li>
    );
  }

}


class OrderSummaryTotal extends React.PureComponent {

  static propTypes = {
    totalPrice: pricePropType.isRequired,
  };

  render() {
    const { totalPrice } = this.props;

    return (
      <p className="order-summary__total">
        <span className="order-summary__total-label">
          Total de votre commande
        </span>
        <Price className="order-summary__total-price" {...totalPrice} />
      </p>
    );
  }

}
