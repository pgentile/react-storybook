import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import FieldContainer from './FieldContainer';
import InputField from './InputField';
import Button from './Button';

import './VoucherForm.scss';


class VoucherForm extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  onCancel = () => {
    this.props.resetForm();
    this.props.onCancel();
  };

  render() {
    const {
      className,
      values,
      errors,
      touched,
      submitCount,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid,
    } = this.props;

    const codeErrorMessage = submitCount > 0 || touched.code ? errors.code : null;

    return (
      <form className={`voucher-form ${className}`} onSubmit={handleSubmit}>

        <div className="voucher-form__line">
          <FieldContainer
            label="Code promo"
            errorMessage={codeErrorMessage}>
            {props => (
              <InputField
                {...props}
                name="code"
                autoFocus
                maxLength={16}
                disabled={isSubmitting}
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur} />
            )}
          </FieldContainer>
        </div>

        <div className="voucher-form__line">
          <Button
            className="voucher-form__button"
            showDisabled={!isValid}
            disabled={isSubmitting}
            type="submit">
            Ajouter le code promo
          </Button>
          <Button
            className="voucher-form__button"
            type="button"
            disabled={isSubmitting}
            onClick={this.onCancel}>
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
    code: props.code || '',
  }),
  validate: values => {
    const errors = {};

    if (values.code.length < 6) {
      errors.code = 'Votre code est trop court';
    }

    return errors;
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    try {
      await props.onAddVoucher(values.code);
    } catch (e) {
      setErrors({
        code: "Nous n'avons pas réussi à prendre en compte votre code promo",
      });
    } finally {
      setSubmitting(false);
    }
  },
})(VoucherForm);
