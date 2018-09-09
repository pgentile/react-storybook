import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

import CheckableImageInput from "../forms/CheckableImageInput";
import CreditCardForm from "./CreditCardForm";
import RegistredCreditCardList from "./RegistredCreditCardList";

import "./PaymentForm.scss";

const availablePaymentMeans = [
  {
    name: "registred-cards",
    icon: faCreditCard
  },
  {
    name: "visa",
    icon: faCcVisa
  },
  {
    name: "mastercard",
    icon: faCcMastercard
  },
  {
    name: "american-express",
    icon: faCcAmex
  }
];

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

  onMeanChange = event => {
    this.setState({
      mean: event.target.value
    });
  };

  render() {
    const { className, price } = this.props;
    const { isSubmitting, mean } = this.state;
    const paymentMeanIsRegistredCards = mean === "registred-cards";

    const cardNetworks = availablePaymentMeans.map(availablePaymentMean => {
      return (
        <CheckableImageInput
          key={availablePaymentMean.name}
          className="payment-form__mean"
          name="mean"
          value={availablePaymentMean.name}
          checked={mean === availablePaymentMean.name}
          disabled={isSubmitting}
          onChange={this.onMeanChange}
        >
          <FontAwesomeIcon icon={availablePaymentMean.icon} size="2x" />
        </CheckableImageInput>
      );
    });

    return (
      <div className={`payment-form ${className}`}>
        <p className="payment-form__select-mean">Sélectionnez votre moyen de paiement&nbsp;:</p>
        <div className="payment-form__means">{cardNetworks}</div>
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
          <CreditCardForm className="payment-form__credit-card-form" price={price} onPay={this.onPay} />
        )}
      </div>
    );
  }
}
