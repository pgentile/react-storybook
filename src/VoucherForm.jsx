import React from 'react';
import PropTypes from 'prop-types';

import FieldContainer from './FieldContainer';
import InputField from './InputField';

import './VoucherForm.scss';


export default class VoucherForm extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onAddVoucher: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    disabled: false,
  };

  state = {
    code: '',
    errorMessage: null,
    valid: false,
    touched: false,
  };

  onCodeChange = event => {
    const code = event.target.value;
    this.setState({
      code,
      ...this.validateCode(code),
    });
  };

  onCodeBlur = () => {
    this.setState({
      touched: true,
    });
  };

  onCancel = () => {
    this.setState({
      code: '',
      touched: false,
    });

    this.props.onCancel();
  }

  validateCode(code) {
    if (code.length < 6) {
      return {
        valid: false,
        errorMessage: 'Votre code est trop court.',
      }
    }
    return {
      valid: true,
      errorMessage: null,
    };
  }

  onVoucherSubmit = async event => {
    event.preventDefault();

    const { code, valid } = this.state;

    if (valid) {
      this.props.onAddVoucher(code);
    } else {
      this.setState({
        touched: true,
      });
    }
  };

  render() {
    const { className, disabled } = this.props;
    const { code, touched, errorMessage } = this.state;

    return (
      <form
        className={`voucher-form ${className}`}
        onSubmit={this.onVoucherSubmit}
        onReset={this.onCancel}>

        <div className="voucher-form__line">
          <FieldContainer
            label="Code promo"
            errorMessages={errorMessage && touched ? [errorMessage] : []}>
            {props => (
              <InputField
                {...props}
                disabled={disabled}
                autoFocus
                type="text"
                value={code}
                maxLength={16}
                onChange={this.onCodeChange}
                onBlur={this.onCodeBlur} />
            )}
          </FieldContainer>
        </div>

        <div className="voucher-form__line">
          <button disabled={disabled} type="submit">
            Ajouter le code promo
          </button>
          {' '}
          <button disabled={disabled} type="reset">
            Annuler
          </button>
        </div>

      </form>
    );
  }

}
