import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import cardValidator from "card-validator";
import creditCardType from "credit-card-type";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";
import DateInput from "../forms/DateInput";
import Button from "../buttons/Button";
import Price from "../Price";

import "./CreditCardForm.scss";

class CreditCardForm extends React.PureComponent {
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
    const {
      className,
      price,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      isSubmitting,
      isValid
    } = this.props;
    const disableForm = isSubmitting;

    const cards = creditCardType(values.cardNumber);
    const isMaestro = cards && cards.length === 1 && cards[0].type === "maestro";
    const cvvHelpMessage =
      isMaestro && !values.cvv
        ? "Toutes les cartes Maestro ne possèdent pas de code de sécurité. Si aucun code n'est présent, ne renseignez pas ce champ"
        : null;

    return (
      <form className={`credit-card-form ${className}`} onSubmit={handleSubmit}>
        <FieldContainer
          label="Numéro de carte"
          className="credit-card-form__card-number"
          disabled={disableForm}
          errorMessage={touched.cardNumber && errors.cardNumber}
        >
          {props => (
            <InputField
              as={NumberInput}
              {...props}
              name="cardNumber"
              autoComplete="cc-number"
              maxLength={19}
              value={values.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Date d'expiration"
          className="credit-card-form__expiration-date"
          disabled={disableForm}
          errorMessage={touched.expirationDate && errors.expirationDate}
        >
          {props => (
            <DateInput
              {...props}
              mode="year-month"
              smallYear
              name="expirationDate"
              value={values.expirationDate}
              autoComplete={{ month: "cc-exp-month", year: "cc-exp-year" }}
              onChange={value => setFieldValue("expirationDate", value)}
              onBlur={() => setFieldTouched("expirationDate", true)}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Code de sécurité"
          className="credit-card-form__cvv"
          disabled={disableForm}
          errorMessage={touched.cvv && errors.cvv}
          helpMessage={cvvHelpMessage}
          optional={isMaestro}
        >
          {props => (
            <InputField
              as={NumberInput}
              {...props}
              name="cvv"
              autoComplete="cc-csc"
              maxLength={4}
              value={values.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <div className="credit-card-form__button">
          <Button size="large" type="submit" showDisabled={!isValid} disabled={disableForm}>
            Payer&nbsp;
            <Price noColor price={price} />
          </Button>
        </div>
      </form>
    );
  }
}

const acceptedTypes = new Set(["visa", "mastercard", "american-express", "maestro"]);

export default withFormik({
  mapPropsToValues: () => ({
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    name: ""
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
        if (!acceptedTypes.has(type)) {
          errors.cardNumber = `Les cartes bancaires ${niceType} ne sont pas supportées`;
        }
      }
    }

    if (values.cvv) {
      const cvvLength = cardValidation && cardValidation.card && cardValidation.card.code.size;
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
})(CreditCardForm);
