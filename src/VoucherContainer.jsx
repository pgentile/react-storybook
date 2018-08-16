import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import FlatButton from './FlatButton';
import VoucherForm from './VoucherForm';

import './VoucherContainer.scss';


export default class VoucherContainer extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    onAddVoucher: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    currentState: 'QUESTION',
  };

  onShowForm = () => {
    this.setState({
      currentState: 'FORM',
    });
  };

  onHideForm = () => {
    this.setState({
      currentState: 'QUESTION',
    });
  }

  render() {
    const { className, onAddVoucher } = this.props;
    const { currentState } = this.state;

    const showQuestion = currentState === 'QUESTION';
    const showForm = currentState === 'FORM';

    return (
      <Card as="section" layer="flat" className={`voucher-container ${className}`}>

        {showQuestion && <FlatButton
          className="voucher-container__question"
          onClick={this.onShowForm}>
            Avez-vous un code promo&nbsp;?
        </FlatButton>}

        {showForm && <VoucherForm
          className="voucher-container__form"
          onAddVoucher={onAddVoucher}
          onCancel={this.onHideForm}
        />}

      </Card>
    );
  }

}
