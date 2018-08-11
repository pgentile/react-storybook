import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

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
  };

  onShowForm = event => {
    event.preventDefault();
    this.setState({
      currentState: 'FORM',
    });
  };

  onCodeChange = event => {
    this.setState({
      code: event.target.value,
    });
  };

  onCancel = () => {
    this.setState({
      currentState: 'QUESTION',
      code: '',
    });
  }

  onVoucherSubmit = async event => {
    const { code } = this.state;

    event.preventDefault();
    this.setState({
      currentState: 'FORM_SUBMITTING',
    });

    try {
      await this.props.onAddVoucher({ code });
    } catch (e) {
      this.setState({
        currentState: 'FORM',
      });
    }
  };

  render() {
    const { className } = this.props;
    const { currentState, code } = this.state;

    const showQuestion = currentState === 'QUESTION';
    const showForm = currentState === 'FORM' || currentState === 'FORM_SUBMITTING';
    const disableForm = currentState === 'FORM_SUBMITTING';

    return (
      <Card
        as="section"
        className={`voucher-form ${className}`}
        onClick={showQuestion ? this.onShowForm : null}>
        {showQuestion && <p className="voucher-form__question">
            Avez-vous un code promo&nbsp;?
        </p>}
        {showForm && <form
          className="voucher-form__form"
          onSubmit={this.onVoucherSubmit} onReset={this.onCancel}>

          <input
            disabled={disableForm}
            autoFocus
            type="text"
            placeholder="Code promo"
            value={code}
            onChange={this.onCodeChange} />
          {' '}
          <button disabled={disableForm} type="submit">
            Ajouter le code promo
          </button>
          {' '}
          <button disabled={disableForm} type="reset">
            Annuler
          </button>

        </form>}
      </Card>
    );
  }

}
