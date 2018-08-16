import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import FieldContainer from './FieldContainer';
import InputField from './InputField';

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
    } = this.props;

    const errorMessages = nonFalseList(
      submitCount > 0 || touched.code ? errors.code : null
    );

    return (
      <form className={`voucher-form ${className}`} onSubmit={handleSubmit}>

        <div className="voucher-form__line">
          <FieldContainer
            label="Code promo"
            errorMessages={errorMessages}>
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
          <button disabled={isSubmitting} type="submit">
            Ajouter le code promo
          </button>
          {' '}
          <button type="button" disabled={isSubmitting} onClick={this.onCancel}>
            Annuler
          </button>
        </div>

        <pre className="voucher-form__line">{JSON.stringify(this.props, null, 2)}</pre>
      </form>
    );
  }

}


export default withFormik({
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


function nonFalseList(...items) {
  return items.filter(item => !!item);
}
