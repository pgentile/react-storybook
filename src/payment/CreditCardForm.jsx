import React from "react";
import PropTypes from "prop-types";
import { Form, useField, useFormState } from "react-final-form";
import createDecorator from "final-form-focus";
import cardValidator from "card-validator";
import creditCardType from "credit-card-type";

import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalButton from "../ff/FinalButton";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";
import Price from "../Price";
import Card from "../Card";

import "./CreditCardForm.scss";

const focusOnErrors = createDecorator();

export default function CreditCardForm({ className = "", totalPrice, onPay }) {
  const onSubmit = async (values) => {
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
    currency: PropTypes.string.isRequired,
  }).isRequired,
  onPay: PropTypes.func.isRequired,
};

function InternalCreditCardForm({ totalPrice }) {
  const { hasSubmitErrors, submitError } = useFormState({
    subscription: {
      hasSubmitErrors: true,
      submitError: true,
    },
  });

  const cardNumber = useField("cardNumber", {
    subscription: {
      value: true,
    },
    validate: (value) => {
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
    validateFields: ["cvv"],
  });

  useField("expirationDate", {
    subscription: {},
    validate: (value) => {
      const [year, month] = (value ?? "").split("-");
      if (!cardValidator.expirationDate({ year, month }).isValid) {
        return "Date d'expiration invalide";
      }
    },
    validateFields: [],
  });

  useField("cvv", {
    subscription: {},
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
    validateFields: ["cardNumber"],
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

      <FinalFieldContainer name="cardNumber" label="Numéro de carte" className="credit-card-form__card-number">
        {(props) => <InputField as={NumberInput} {...props} autoComplete="cc-number" maxLength={19} />}
      </FinalFieldContainer>

      <FinalFieldContainer
        name="expirationDate"
        label="Date d'expiration"
        className="credit-card-form__expiration-date"
        helpMessage="Date au format AA-MM"
      >
        {(props) => <InputField {...props} autoComplete="cc-exp" maxLength={5} />}
      </FinalFieldContainer>

      <FinalFieldContainer
        name="cvv"
        label="Code de sécurité"
        className="credit-card-form__cvv"
        helpMessage={cvvHelpMessage}
        optional={isMaestro}
      >
        {(props) => <InputField as={NumberInput} {...props} autoComplete="cc-csc" maxLength={4} />}
      </FinalFieldContainer>

      <div className="credit-card-form__button">
        <FinalButton size="large" type="submit">
          Payer&nbsp;
          <Price noColor price={totalPrice} />
        </FinalButton>
      </div>
    </>
  );
}

InternalCreditCardForm.propTypes = {
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};
