import PropTypes from "prop-types";
import { getTypeInfo } from "credit-card-type";
import { Form, useField, useForm } from "react-final-form";
import createDecorator from "final-form-focus";

import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalButton from "../ff/FinalButton";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";
import Price from "../Price";

import "./RegistredCardCvvForm.scss";

const BRANDS = ["visa", "mastercard", "american-express", "maestro"];

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
  brand: PropTypes.oneOf(BRANDS).isRequired,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onUseCard: PropTypes.func.isRequired,
};

function InternalRegistredCardCvvForm({ brand, totalPrice, disabled, onCancel }) {
  const { reset, resetFieldState } = useForm();

  useField("cvv", {
    subscription: {},
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
      <FinalFieldContainer
        name="cvv"
        label="Code de sécurité"
        className="registred-card-cvv-form__cvv"
        helpMessage={cvvHelpMessage}
        optional={isMaestro}
        disabled={disabled}
      >
        {(props) => <InputField as={NumberInput} {...props} autoComplete="cc-csc" maxLength={cvvLength} />}
      </FinalFieldContainer>
      <div className="registred-card-cvv-form__buttons">
        <FinalButton type="submit" size="small" disabled={disabled}>
          Payer&nbsp;
          <Price noColor price={totalPrice} />
        </FinalButton>
        <FinalButton type="reset" size="small" disabled={disabled} onClick={onCancelClick}>
          Annuler
        </FinalButton>
      </div>
    </>
  );
}

InternalRegistredCardCvvForm.propTypes = {
  brand: PropTypes.oneOf(BRANDS).isRequired,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};
