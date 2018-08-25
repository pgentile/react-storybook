import React from "react";
import PropTypes from "prop-types";

import PaymentForm from "./PaymentForm";

import "./PaymentFormContainer.scss";

export default class PaymentFormContainer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired,
    onPay: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { price, onPay } = this.props;

    return (
      <div className="payment-form-container">
        <h1 className="payment-form-container__title">Payez en toute sécurité</h1>
        <PaymentForm className="payment-form-container__form" price={price} onPay={onPay} />
      </div>
    );
  }
}
