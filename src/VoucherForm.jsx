import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import FlatButton from './FlatButton';
import FieldContainer from './FieldContainer';
import InputField from './InputField';

import './VoucherForm.scss';


export default class VoucherForm extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string.isRequired,
    onAddVoucher: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    currentState: 'QUESTION',
    code: '',
    errorMessage: null,
    valid: false,
    touched: false,
  };

  onShowForm = event => {
    event.preventDefault();
    this.setState({
      currentState: 'FORM',
    });
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
      currentState: 'QUESTION',
      code: '',
      touched: false,
    });
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
    const { code } = this.state;

    event.preventDefault();
    this.setState({
      currentState: 'FORM_SUBMITTING',
    });

    try {
      await this.props.onAddVoucher(code);
    } catch (e) {
      this.setState({
        currentState: 'FORM',
      });
    }
  };

  render() {
    const { className } = this.props;
    const { currentState, code, valid, touched, errorMessage } = this.state;

    const showQuestion = currentState === 'QUESTION';
    const showForm = currentState === 'FORM' || currentState === 'FORM_SUBMITTING';
    const disableForm = currentState === 'FORM_SUBMITTING';
    const disableSubmit = !valid;

    return (
      <Card as="section" layer="flat" className={`voucher-form ${className}`}>

        {showQuestion && <FlatButton
          className="voucher-form__question"
          onClick={this.onShowForm}>
            Avez-vous un code promo&nbsp;?
        </FlatButton>}

        {showForm && <form
          className="voucher-form__form"
          onSubmit={this.onVoucherSubmit} onReset={this.onCancel}>

          <div className="voucher-form__form-line">
            <FieldContainer label="Code promo" errorMessages={errorMessage && touched ? [errorMessage] : []}>
              {props => (
                <InputField
                  {...props}
                  disabled={disableForm}
                  autoFocus
                  type="text"
                  value={code}
                  maxlength={16}
                  onChange={this.onCodeChange}
                  onBlur={this.onCodeBlur} />
              )}
            </FieldContainer>
          </div>

          <div className="voucher-form__form-line">
            <button disabled={disableForm || disableSubmit} type="submit">
              Ajouter le code promo
            </button>
            {' '}
            <button disabled={disableForm} type="reset">
              Annuler
            </button>
          </div>

        </form>}

      </Card>
    );
  }

}
