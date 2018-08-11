import React from 'react';

import OrderSummary from './OrderSummary';
import VoucherForm from './VoucherForm';
import Donation from './Donation';

import './OrderEditor.scss';


export default class OrderEditor extends React.PureComponent {

  static propTypes = {
    items: OrderSummary.propTypes.items,
    onAddVoucher: VoucherForm.propTypes.onAddVoucher,
    onAddDonation: Donation.propTypes.onAddDonation
  };

  render() {
    const { items, onAddVoucher, onAddDonation } = this.props;
    const hasVoucher = hasItemOfType(items, 'VOUCHER');

    return (
      <section className="order-editor">
        <div className="payment-container__left">

          <OrderSummary className="order-editor__summary" items={items} />

          {!hasVoucher && <VoucherForm
            className="order-editor__voucher-form"
            onAddVoucher={onAddVoucher}
          />}

          <Donation
            className="order-editor__donation"
            onAddDonation={onAddDonation} />

        </div>
      </section>
    );
  }

}


function hasItemOfType(items, type) {
  return items.some(item => item.type === type);
}
