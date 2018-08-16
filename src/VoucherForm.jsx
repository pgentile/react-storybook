import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import FieldContainer from './FieldContainer';
import InputField from './InputField';
import Button from './Button';
import ProgressButton from './ProgressButton';

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
      status,
    } = this.props;

    const codeErrorMessage = submitCount > 0 || touched.code ? errors.code : null;
    const success = status === 'SUCCESS';
    const submitError = status === 'FAILED';
    const disableForm = isSubmitting || success;

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
                autoComplete="off"
                maxLength={16}
                disabled={disableForm}
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur} />
            )}
          </FieldContainer>
        </div>

        <div className="voucher-form__line">
          <ProgressButton
            className="voucher-form__button"
            type="submit"
            size="small"
            showDisabled={!submitError && !isValid}
            disabled={disableForm}
            loading={disableForm}
            finished={success}>
            Ajouter le code promo
          </ProgressButton>
          <Button
            className="voucher-form__button"
            type="button"
            size="small"
            disabled={disableForm}
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
  handleSubmit: async (values, { props, setSubmitting, setErrors, setStatus }) => {
    try {
      await props.onAddVoucher(values.code);
      setStatus('SUCCESS');
    } catch (e) {
      setErrors({
        code: "Nous n'avons pas réussi à prendre en compte votre code promo",
      });
      setStatus('FAILED');
    } finally {
      setSubmitting(false);
    }
  },
})(VoucherForm);
