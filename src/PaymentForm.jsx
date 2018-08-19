import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import luhn from "fast-luhn";

import FieldContainer from "./FieldContainer";
import InputField from "./InputField";
import DateInput from "./DateInput";
import Button from "./Button";
import Price from "./Price";

import sleep from "./sleep";

import "./PaymentForm.scss";

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

  onCancel = () => {
    this.props.onCancel();
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

    return (
      <form className={`payment-form ${className}`} onSubmit={handleSubmit}>
        <div className="payment-form__line payment-form__line--card-number">
          <FieldContainer label="Numéro de carte" errorMessage={touched.cardNumber && errors.cardNumber}>
            {props => (
              <InputField
                {...props}
                name="cardNumber"
                autoComplete="cc-number"
                maxLength={19}
                disabled={disableForm}
                value={values.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
          </FieldContainer>
        </div>

        <div className="payment-form__line payment-form__line--expiration-date">
          <FieldContainer label="Date d'expiration" errorMessage={touched.expirationDate && errors.expirationDate}>
            {props => (
              <DateInput
                {...props}
                name="expirationDate"
                disabled={disableForm}
                value={values.expirationDate}
                onChange={value => setFieldValue("expirationDate", value)}
                onBlur={() => setFieldTouched("expirationDate", true)}
              />
            )}
          </FieldContainer>
        </div>

        <div className="payment-form__line payment-form__line--cvv">
          <FieldContainer label="Code de sécurité" errorMessage={touched.cvv && errors.cvv}>
            {props => (
              <InputField
                {...props}
                name="cvv"
                autoComplete="cc-csc"
                maxLength={4}
                disabled={disableForm}
                value={values.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
          </FieldContainer>
        </div>

        <div className="payment-form__line payment-form__line--button">
          <Button size="large" type="submit" showDisabled={!isValid} disabled={disableForm}>
            Payer&nbsp;
            <Price noColor price={price} />
          </Button>
        </div>
      </form>
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

    if (values.cardNumber.length < 12) {
      errors.cardNumber = "Numéro de carte trop court";
    }
    if (!luhn(values.cardNumber)) {
      errors.cardNumber = "Numéro de carte invalide";
    }

    if (values.cvv.length < 3) {
      errors.cvv = "Code de sécurité trop court";
    }

    if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(values.expirationDate)) {
      errors.expirationDate = "Date invalide";
    }

    return errors;
  },
  handleSubmit: async (values, { setSubmitting }) => {
    try {
      await sleep(values);
    } catch (e) {
      console.error("Failed to submit", e);
    } finally {
      setSubmitting(false);
    }
  }
})(PaymentForm);
