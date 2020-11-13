import { useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Price from "../Price";
import Card from "../Card";
import Button from "../buttons/Button";

import "./OrderSummary.scss";

export const orderItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  price: Price.propTypes.price,
  onCancel: PropTypes.func,
});

export default function OrderSummary({ items }) {
  const hasManyItems = items.length > 1;

  const totalPrice = useMemo(() => {
    const totalPriceValue = items.map((item) => item.price.value).reduce((total, current) => total + current, 0);
    const totalPriceCurrency = items?.[0]?.price.currency ?? "EUR";
    return {
      value: totalPriceValue,
      currency: totalPriceCurrency,
    };
  }, [items]);

  return (
    <Card as="section" className="order-summary" layer="raised">
      {hasManyItems && <OrderSummaryDetails items={items} />}
      {hasManyItems && <div className="order-summary__separator" />}
      <OrderSummaryTotal totalPrice={totalPrice} />
    </Card>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired,
};

function OrderSummaryDetails({ items }) {
  const itemElements = items.map((item) => {
    return <OrderSummaryItem key={item.id} item={item} />;
  });

  return <ul className="order-summary__details">{itemElements}</ul>;
}

OrderSummaryDetails.propTypes = {
  items: PropTypes.arrayOf(orderItemPropType.isRequired).isRequired,
};

function OrderSummaryItem({ item }) {
  const { label, price, onCancel } = item;

  const onCancelClick = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <li className="order-summary__item">
      <span className="order-summary__item-label">{label}</span>
      {onCancel && (
        <Button link type="button" className="order-summary__item-cancel" href="#" onClick={onCancelClick}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      )}
      <Price className="order-summary__item-price" price={price} />
    </li>
  );
}

OrderSummaryItem.propTypes = {
  item: orderItemPropType.isRequired,
};

function OrderSummaryTotal({ totalPrice }) {
  return (
    <p className="order-summary__total">
      <span className="order-summary__total-label">Total de votre commande</span>
      <Price className="order-summary__total-price" price={totalPrice} />
    </p>
  );
}
OrderSummaryTotal.propTypes = {
  totalPrice: Price.propTypes.price,
};
