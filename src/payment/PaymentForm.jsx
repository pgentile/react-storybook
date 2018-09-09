import React from "react";
import PropTypes from "prop-types";

import CreditCardForm from "./CreditCardForm";
import RegistredCreditCardList from "./RegistredCreditCardList";
import PaymentMeans from "./PaymentMeans";

import "./PaymentForm.scss";

export default class PaymentForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired,
    registredCards: RegistredCreditCardList.propTypes.cards,
    onPay: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  state = {
    isSubmitting: false,
    mean: null
  };

  onPay = async values => {
    this.setState({ isSubmitting: true });
    try {
      return await this.props.onPay(values);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  onMeanChange = mean => {
    this.setState({ mean });
  };

  render() {
    const { className, registredCards, price } = this.props;
    const { isSubmitting, mean } = this.state;
    const paymentMeanIsRegistredCards = mean === "registred-cards";

    return (
      <div className={`payment-form ${className}`}>
        <p className="payment-form__select-mean">Sélectionnez votre moyen de paiement&nbsp;:</p>
        <PaymentMeans
          className="payment-form__means"
          means={["registred-cards", "visa", "mastercard", "maestro", "american-express"]}
          selectedMean={mean}
          onMeanChange={this.onMeanChange}
          disabled={isSubmitting}
        />
        {paymentMeanIsRegistredCards && (
          <RegistredCreditCardList cards={registredCards} disabled={isSubmitting} onUseCard={this.onPay} />
        )}
        {!paymentMeanIsRegistredCards && (
          <CreditCardForm className="payment-form__credit-card-form" totalPrice={price} onPay={this.onPay} />
        )}
      </div>
    );
  }
}
