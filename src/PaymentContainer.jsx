import React from 'react';

import OrderEditor from './OrderEditor';
import Wip from './Wip';

import './PaymentContainer.scss';


export default class PaymentContainer extends React.PureComponent {

  static propTypes = {
    items: OrderEditor.propTypes.items,
    onAddVoucher: OrderEditor.propTypes.onAddVoucher,
    onAddDonation: OrderEditor.propTypes.onAddDonation,
    onCancelDonation: OrderEditor.propTypes.onCancelDonation,
  };

  render() {
    const { items, onAddVoucher, onAddDonation, onCancelDonation } = this.props;

    return (
      <section className="payment-container">
        <div className="payment-container__left">
          <OrderEditor
            items={items}
            onAddVoucher={onAddVoucher}
            onAddDonation={onAddDonation}
            onCancelDonation={onCancelDonation} />
        </div>
        <div className="payment-container__right">
          <Wip>
            <p style={{height: '30rem'}}>
              Ici, il y aura le formulaire de paiement
            </p></Wip>
        </div>
      </section>
    );
  }

}
