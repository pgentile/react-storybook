import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import cardValidator from "card-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

import CreditCardForm from "./CreditCardForm";
import CheckableImageInput from "../forms/CheckableImageInput";

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

class PaymentForm extends React.PureComponent {
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
      return this.props.onPay(values);
    } catch (e) {
      this.setState({ isSubmitting: false });
      throw e;
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
    const disableForm = isSubmitting;

    const cardNetworks = availablePaymentMeans.map(availablePaymentMean => {
      return (
        <CheckableImageInput
          key={availablePaymentMean.name}
          className="payment-form__mean"
          name="mean"
          value={availablePaymentMean.name}
          checked={mean === availablePaymentMean.name}
          disabled={disableForm}
          onChange={this.onMeanChange}
        >
          <FontAwesomeIcon icon={availablePaymentMean.icon} size="2x" />
        </CheckableImageInput>
      );
    });

    return (
      <div className={`payment-form ${className}`}>
        <p className="payment-form__line payment-form__select-mean">Sélectionnez votre moyen de paiement&nbsp;:</p>
        <div className="payment-form__line payment-form__means">{cardNetworks}</div>
        <CreditCardForm className="payment-form__credit-card-form" price={price} onPay={this.onPay} />
      </div>
    );
  }
}

export default withFormik({
  validateOnBlur: false,
  mapPropsToValues: () => ({
    cardNumber: "",
    cvv: "",
    expirationDate: ""
  }),
  validate: values => {
    const errors = {};

    const cardValidation = cardValidator.number(values.cardNumber);
    const card = (cardValidation && cardValidation.card) || { type: null };

    if (cardValidation === null || !cardValidation.isValid) {
      errors.cardNumber = "Numéro de carte invalide";
    } else {
      const { type, niceType } = card;
      if (type) {
        const acceptedTypes = new Set(["visa", "mastercard", "american-express", "maestro"]);
        if (!acceptedTypes.has(type)) {
          errors.cardNumber = `Les cartes bancaires ${niceType} ne sont pas supportées`;
        }
      }
    }

    if (values.cvv) {
      const cvvLength = (cardValidation && cardValidation.card && cardValidation.card.code.size) || null;
      if (cvvLength && cvvLength !== values.cvv.length) {
        errors.cvv = `Le code de sécurité doit faire ${cvvLength} chiffres`;
      }
    } else {
      const { type } = card;
      if (type !== "maestro") {
        errors.cvv = "Le code de sécurité est requis";
      }
    }

    const [year, month] = values.expirationDate.split("-");
    if (!cardValidator.expirationDate({ year, month }).isValid) {
      errors.expirationDate = "Date d'expiration invalide";
    }

    return errors;
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    try {
      await props.onPay(values);
    } catch (e) {
      console.error("Failed to submit", e);

      if (e.details && e.details.type === "VALIDATION") {
        setErrors(e.details.errors || {});
      }
    } finally {
      setSubmitting(false);
    }
  }
})(PaymentForm);
