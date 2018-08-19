import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";

import FieldContainer from "./FieldContainer";
import InputField from "./InputField";
import Button from "./Button";
import ProgressButton from "./ProgressButton";

import "./VoucherForm.scss";

class VoucherForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onCancel: PropTypes.func.isRequired
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
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid,
      status
    } = this.props;
    const { submissionStatus, errorMessage } = status || {};

    const success = submissionStatus === "SUCCESS";
    const disableForm = isSubmitting || success;

    return (
      <form className={`voucher-form ${className}`} onSubmit={handleSubmit}>
        <div className="voucher-form__line">
          <FieldContainer label="Code promo" errorMessage={(touched.code && errors.code) || errorMessage}>
            {props => (
              <InputField
                {...props}
                name="code"
                autoComplete="off"
                spellCheck={false}
                maxLength={16}
                disabled={disableForm}
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
          </FieldContainer>
        </div>

        <div className="voucher-form__line">
          <ProgressButton
            className="voucher-form__button"
            type="submit"
            size="small"
            showDisabled={!isValid}
            disabled={disableForm}
            loading={isSubmitting}
            finished={success}
          >
            Ajouter le code promo
          </ProgressButton>
          <Button
            className="voucher-form__button"
            type="button"
            size="small"
            disabled={disableForm}
            onClick={this.onCancel}
          >
            Annuler
          </Button>
        </div>
      </form>
    );
  }
}

export default withFormik({
  validateOnBlur: false,
  mapPropsToValues: props => ({
    code: props.code || ""
  }),
  validate: values => {
    const errors = {};

    if (values.code.length < 6) {
      errors.code = "Votre code est trop court";
    }

    return errors;
  },
  handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
    try {
      await props.onAddVoucher(values.code);
      setStatus({
        submissionStatus: "SUCCESS"
      });
    } catch (e) {
      setStatus({
        submissionStatus: "FAILED",
        errorMessage: "Nous n'avons pas réussi à prendre en compte votre code promo"
      });
    } finally {
      setSubmitting(false);
    }
  }
})(VoucherForm);
