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
    registredCards: PaymentForm.propTypes.registredCards,
    onPay: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { price, registredCards, onPay } = this.props;

    return (
      <section className="payment-form-container">
        <h1 className="payment-form-container__title">Payez en toute sécurité</h1>
        <PaymentForm
          className="payment-form-container__form"
          price={price}
          registredCards={registredCards}
          onPay={onPay}
        />
      </section>
    );
  }
}
