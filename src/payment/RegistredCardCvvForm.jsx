import React from "react";
import PropTypes from "prop-types";
import { getTypeInfo } from "credit-card-type";
import { withFormik, Formik } from "formik";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import Button from "../buttons/Button";
import NumberInput from "../forms/NumberInput";
import Price from "../Price";

import "./RegistredCardCvvForm.scss";

class RegistredCardCvvForm extends React.PureComponent {
  static propTypes = {
    ...Formik.propTypes,
    brand: PropTypes.string.isRequired,
    totalPrice: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired,
    disabled: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onUseCard: PropTypes.func.isRequired
  };

  onCancel = () => {
    this.props.onCancel();
  };

  render() {
    const {
      brand,
      totalPrice,
      disabled,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      isSubmitting
    } = this.props;
    const disableForm = isSubmitting || disabled;

    const cardBrandInfo = getTypeInfo(brand);
    const cvvLength = cardBrandInfo.code.size;
    const isMaestro = brand === "maestro";
    const cvvHelpMessage = isMaestro
      ? "Certaines cartes Maestro ne possèdent pas de code de sécurité. Si aucun code n'est présent, ne renseignez pas ce champ"
      : null;

    return (
      <form className="registred-card-cvv-form" onSubmit={handleSubmit} onReset={handleReset}>
        <FieldContainer
          className="registred-card-cvv-form__cvv"
          label="Code de sécurité"
          optional={isMaestro}
          disabled={disableForm}
          errorMessage={touched.cvv && errors.cvv}
          helpMessage={cvvHelpMessage}
        >
          {props => (
            <InputField
              as={NumberInput}
              {...props}
              name="cvv"
              value={values.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={cvvLength}
              autoComplete="cc-csc"
            />
          )}
        </FieldContainer>
        <div className="registred-card-cvv-form__buttons">
          <Button type="submit" size="small" disabled={disableForm}>
            Payer&nbsp;
            <Price noColor price={totalPrice} />
          </Button>
          <Button type="reset" size="small" onClick={this.onCancel} disabled={disableForm}>
            Annuler
          </Button>
        </div>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    cvv: ""
  }),
  validateOnMount: true,
  validate: (values, props) => {
    const { brand } = props;

    const errors = {};

    const cardBrandInfo = getTypeInfo(brand);

    if (values.cvv) {
      const cvvLength = cardBrandInfo && cardBrandInfo.code && cardBrandInfo.code.size;
      if (cvvLength && cvvLength !== values.cvv.length) {
        errors.cvv = `Le code de sécurité doit faire ${cvvLength} chiffres`;
      }
    } else {
      if (brand !== "maestro") {
        errors.cvv = "Le code de sécurité est requis";
      }
    }

    return errors;
  },
  handleSubmit: async (values, { props, setSubmitting }) => {
    try {
      await props.onUseCard(values);
    } finally {
      setSubmitting(false);
    }
  }
})(RegistredCardCvvForm);
