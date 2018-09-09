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
    const { className, price } = this.props;
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
          <RegistredCreditCardList
            cards={[
              {
                id: "1",
                brand: "visa",
                maskedNumber: "#### #### #### 1111",
                expirationDate: "2031-07"
              },
              {
                id: "2",
                brand: "mastercard",
                maskedNumber: "#### #### #### 1113",
                expirationDate: "2029-01"
              },
              {
                id: "3",
                brand: "maestro",
                maskedNumber: "#### #### #### 1113",
                expirationDate: "2029-01"
              }
            ]}
            onUseCard={this.onPay}
          />
        )}
        {!paymentMeanIsRegistredCards && (
          <CreditCardForm className="payment-form__credit-card-form" totalPrice={price} onPay={this.onPay} />
        )}
      </div>
    );
  }
}
