import React from "react";
import PropTypes from "prop-types";

import Price from "./Price";
import Card from "./Card";

import "./OrderSummary.scss";

export const orderItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["DONATION", "VOUCHER"]),
  label: PropTypes.node.isRequired,
  price: Price.propTypes.price,
  onCancel: PropTypes.func
});

export default class OrderSummary extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired
  };

  render() {
    const { items } = this.props;
    const totalPrice = computeTotalPrice(items.map(item => item.price));
    const hasManyItems = items.length > 1;

    return (
      <Card as="section" className="order-summary" layer="raised">
        {hasManyItems && <OrderSummaryDetails items={items} />}
        {hasManyItems && <div className="order-summary__separator" />}
        <OrderSummaryTotal totalPrice={totalPrice} />
      </Card>
    );
  }
}

function computeTotalPrice(prices) {
  if (prices.length === 0) {
    return {
      value: 0,
      currency: "€"
    };
  }

  return {
    value: prices.map(price => price.value).reduce((left, right) => left + right, 0),
    currency: prices[0].currency
  };
}

class OrderSummaryDetails extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired
  };

  render() {
    const { items } = this.props;

    const itemElements = items.map(item => {
      return <OrderSummaryItem key={item.id} item={item} />;
    });

    return <ul className="order-summary__details">{itemElements}</ul>;
  }
}

class OrderSummaryItem extends React.PureComponent {
  static propTypes = {
    item: orderItemPropType.isRequired
  };

  onCancel = event => {
    event.preventDefault();
    this.props.item.onCancel();
  };

  render() {
    const { item } = this.props;
    const { label, price, onCancel } = item;

    return (
      <li className="order-summary__item">
        <span className="order-summary__item-label">
          {label}
          {onCancel && (
            <a className="order-summary__item-cancel" href="#" onClick={this.onCancel}>
              Supprimer
            </a>
          )}
        </span>
        <Price className="order-summary__item-price" price={price} />
      </li>
    );
  }
}

class OrderSummaryTotal extends React.PureComponent {
  static propTypes = {
    totalPrice: Price.propTypes.price
  };

  render() {
    const { totalPrice } = this.props;

    return (
      <p className="order-summary__total">
        <span className="order-summary__total-label">Total de votre commande</span>
        <Price className="order-summary__total-price" price={totalPrice} />
      </p>
    );
  }
}
