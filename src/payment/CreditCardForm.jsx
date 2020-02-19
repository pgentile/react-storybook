import React from "react";
import PropTypes from "prop-types";
import { Form, useField, useFormState } from "react-final-form";
import createDecorator from "final-form-focus";
import cardValidator from "card-validator";
import creditCardType from "credit-card-type";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";
import Button from "../buttons/Button";
import Price from "../Price";
import Card from "../Card";

import "./CreditCardForm.scss";

const focusOnErrors = createDecorator();

export default function CreditCardForm({ className = "", totalPrice, onPay }) {
  const onSubmit = async values => {
    await onPay(values);
  };

  return (
    <Form
      decorators={[focusOnErrors]}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form className={`credit-card-form ${className}`} onSubmit={handleSubmit}>
          <InternalCreditCardForm totalPrice={totalPrice} />
        </form>
      )}
    ></Form>
  );
}

CreditCardForm.propTypes = {
  className: PropTypes.string,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
  }).isRequired,
  onPay: PropTypes.func.isRequired
};

function InternalCreditCardForm({ totalPrice }) {
  const { submitting, hasSubmitErrors, submitError } = useFormState({
    subscription: {
      submitting: true,
      hasSubmitErrors: true,
      submitError: true
    }
  });

  const cardNumber = useField("cardNumber", {
    validate: value => {
      const cardValidation = cardValidator.number(value);
      if (!cardValidation.isValid) {
        return "Numéro de carte invalide";
      }

      const { type, niceType } = cardValidation.card;
      if (type) {
        const acceptedTypes = new Set(["visa", "mastercard", "american-express", "maestro"]);
        if (!acceptedTypes.has(type)) {
          return `Les cartes bancaires ${niceType} ne sont pas supportées`;
        }
      }
    },
    validateFields: ["cvv"]
  });

  const expirationDate = useField("expirationDate", {
    validate: value => {
      const [year, month] = (value ?? "").split("-");
      if (!cardValidator.expirationDate({ year, month }).isValid) {
        return "Date d'expiration invalide";
      }
    },
    validateFields: []
  });

  const cvv = useField("cvv", {
    validate: (value, { cardNumber }) => {
      const cardValidation = cardValidator.number(cardNumber);

      if (value) {
        const cvvLength = cardValidation?.card?.code?.size;
        if (cvvLength && cvvLength !== value.length) {
          return `Le code de sécurité doit faire ${cvvLength} chiffres`;
        }
      } else {
        const type = cardValidation?.card?.type;
        if (type !== "maestro") {
          return "Le code de sécurité est requis";
        }
      }
    },
    validateFields: ["cardNumber"]
  });

  const cards = creditCardType(cardNumber.input.value);
  const isMaestro = cards && cards.length === 1 && cards[0].type === "maestro";
  const cvvHelpMessage = isMaestro
    ? "Certaines cartes Maestro ne possèdent pas de code de sécurité. Si aucun code n'est présent, ne renseignez pas ce champ"
    : null;

  return (
    <>
      {hasSubmitErrors && (
        <Card layer="raised" className="credit-card-form__error">
          {submitError}
        </Card>
      )}

      <FieldContainer
        label="Numéro de carte"
        className="credit-card-form__card-number"
        disabled={submitting}
        errorMessage={getFieldError(cardNumber)}
      >
        {props => (
          <InputField as={NumberInput} {...cardNumber.input} {...props} autoComplete="cc-number" maxLength={19} />
        )}
      </FieldContainer>

      <FieldContainer
        label="Date d'expiration"
        className="credit-card-form__expiration-date"
        disabled={submitting}
        errorMessage={getFieldError(expirationDate)}
        helpMessage="Date au format AA-MM"
      >
        {props => <InputField {...expirationDate.input} {...props} autoComplete="cc-exp" maxLength={5} />}
      </FieldContainer>

      <FieldContainer
        label="Code de sécurité"
        className="credit-card-form__cvv"
        disabled={submitting}
        errorMessage={getFieldError(cvv)}
        helpMessage={cvvHelpMessage}
        optional={isMaestro}
      >
        {props => (
          <InputField as={NumberInput} {...cvv.input} {...props} name="cvv" autoComplete="cc-csc" maxLength={4} />
        )}
      </FieldContainer>

      <div className="credit-card-form__button">
        <Button size="large" type="submit" disabled={submitting}>
          Payer&nbsp;
          <Price noColor price={totalPrice} />
        </Button>
      </div>
    </>
  );
}

InternalCreditCardForm.propTypes = {
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
  }).isRequired
};

function getFieldError(field) {
  const { touched, error, submitError, pristine } = field.meta;
  if (touched && error) {
    return error;
  }
  if (submitError && pristine) {
    return submitError;
  }
}
