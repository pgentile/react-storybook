import React from "react";
import PropTypes from "prop-types";
import { getTypeInfo } from "credit-card-type";
import { Form, useField, useFormState, useForm } from "react-final-form";
import createDecorator from "final-form-focus";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import Button from "../buttons/Button";
import NumberInput from "../forms/NumberInput";
import Price from "../Price";

import "./RegistredCardCvvForm.scss";

const focusOnErrors = createDecorator();

export default function RegistredCardCvvForm({ brand, totalPrice, disabled, onCancel, onUseCard }) {
  const onSubmit = async (values) => {
    await onUseCard(values);
  };

  return (
    <Form
      decorators={[focusOnErrors]}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form className="registred-card-cvv-form" onSubmit={handleSubmit}>
          <InternalRegistredCardCvvForm totalPrice={totalPrice} brand={brand} disabled={disabled} onCancel={onCancel} />
        </form>
      )}
    ></Form>
  );
}

RegistredCardCvvForm.propTypes = {
  brand: PropTypes.string.isRequired,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onUseCard: PropTypes.func.isRequired,
};

function InternalRegistredCardCvvForm({ brand, totalPrice, disabled, onCancel }) {
  const { submitting } = useFormState({
    subscription: {
      submitting: true,
    },
  });

  const { reset, resetFieldState } = useForm();

  const cvv = useField("cvv", {
    validate: (value) => {
      const cardBrandInfo = getTypeInfo(brand);
      if (value) {
        const cvvLength = cardBrandInfo && cardBrandInfo.code && cardBrandInfo.code.size;
        if (cvvLength && cvvLength !== value.length) {
          return `Le code de sécurité doit faire ${cvvLength} chiffres`;
        }
      } else {
        if (brand !== "maestro") {
          return "Le code de sécurité est requis";
        }
      }
    },
    validateFields: [],
  });

  const disableForm = submitting || disabled;

  const cardBrandInfo = getTypeInfo(brand);
  const cvvLength = cardBrandInfo.code.size;
  const isMaestro = brand === "maestro";
  const cvvHelpMessage = isMaestro
    ? "Certaines cartes Maestro ne possèdent pas de code de sécurité. Si aucun code n'est présent, ne renseignez pas ce champ"
    : null;

  const onCancelClick = () => {
    resetFieldState("cvv");
    reset();
    onCancel();
  };

  return (
    <>
      <FieldContainer
        label="Code de sécurité"
        className="registred-card-cvv-form__cvv"
        disabled={disableForm}
        errorMessage={getFieldError(cvv)}
        helpMessage={cvvHelpMessage}
        optional={isMaestro}
      >
        {(props) => (
          <InputField
            as={NumberInput}
            {...cvv.input}
            {...props}
            name="cvv"
            autoComplete="cc-csc"
            maxLength={cvvLength}
          />
        )}
      </FieldContainer>
      <div className="registred-card-cvv-form__buttons">
        <Button type="submit" size="small" disabled={disableForm}>
          Payer&nbsp;
          <Price noColor price={totalPrice} />
        </Button>
        <Button type="reset" size="small" onClick={onCancelClick} disabled={disableForm}>
          Annuler
        </Button>
      </div>
    </>
  );
}

InternalRegistredCardCvvForm.propTypes = {
  brand: PropTypes.string.isRequired,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
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
