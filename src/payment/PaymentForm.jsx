import React from "react";
import PropTypes from "prop-types";

import CreditCardForm from "./CreditCardForm";
import RegistredCreditCardList from "./RegistredCreditCardList";
import PaymentMeans from "./PaymentMeans";

import "./PaymentForm.scss";

export default class PaymentForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    totalPrice: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired,
    registredCards: RegistredCreditCardList.propTypes.cards,
    onPay: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "",
    registredCards: []
  };

  state = {
    mean: null
  };

  onMeanChange = mean => {
    this.setState({ mean });
  };

  render() {
    const { className, registredCards, totalPrice, onPay } = this.props;
    const { mean } = this.state;
    const paymentMeanIsRegistredCards = mean === "registred-cards";

    return (
      <section className={"payment-form " + className}>
        <h1 className="payment-form__title">Payez en toute sécurité</h1>
        <p className="payment-form__select-mean">Sélectionnez votre moyen de paiement&nbsp;:</p>
        <PaymentMeans
          className="payment-form__means"
          means={["registred-cards", "visa", "mastercard", "maestro", "american-express"]}
          selectedMean={mean}
          onMeanChange={this.onMeanChange}
        />
        {paymentMeanIsRegistredCards && (
          <RegistredCreditCardList
            className="payment-form__registred-cards"
            cards={registredCards}
            totalPrice={totalPrice}
            onUseCard={onPay}
          />
        )}
        {!paymentMeanIsRegistredCards && (
          <CreditCardForm className="payment-form__credit-card-form" totalPrice={totalPrice} onPay={onPay} />
        )}
      </section>
    );
  }
}
