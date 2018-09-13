import React, { Fragment } from "react";
import PropTypes from "prop-types";

import CreditCardForm from "./CreditCardForm";
import RegistredCreditCardList from "./RegistredCreditCardList";
import PaymentMeans from "./PaymentMeans";
import PaymentProcessingModal from "./PaymentProcessingModal";

import minDelay from "../utils/minDelay";

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
    mean: null,
    paymentModal: false
  };

  onPay = async values => {
    this.setState({ paymentModal: true });
    try {
      const payPromise = this.props.onPay(values);
      return await minDelay(10 * 1000, payPromise);
    } finally {
      this.setState({ paymentModal: false });
    }
  };

  onMeanChange = mean => {
    this.setState({ mean });
  };

  render() {
    const { className, registredCards, totalPrice } = this.props;
    const { mean, paymentModal } = this.state;
    const paymentMeanIsRegistredCards = mean === "registred-cards";

    return (
      <Fragment>
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
              onUseCard={this.onPay}
            />
          )}
          {!paymentMeanIsRegistredCards && (
            <CreditCardForm className="payment-form__credit-card-form" totalPrice={totalPrice} onPay={this.onPay} />
          )}
        </section>
        {paymentModal && <PaymentProcessingModal />}
      </Fragment>
    );
  }
}
