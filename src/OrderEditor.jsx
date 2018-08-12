import React from 'react';

import OrderSummary from './OrderSummary';
import VoucherForm from './VoucherForm';
import Donation from './Donation';

import './OrderEditor.scss';


export default class OrderEditor extends React.PureComponent {

  static propTypes = {
    items: OrderSummary.propTypes.items,
    onAddVoucher: VoucherForm.propTypes.onAddVoucher,
    onAddDonation: Donation.propTypes.onAddDonation,
    onCancelDonation: Donation.propTypes.onCancelDonation,
  };

  render() {
    const { items, onAddVoucher, onAddDonation, onCancelDonation } = this.props;
    const hasVoucher = hasItemOfType(items, 'VOUCHER');
    const donation = findDonation(items);

    return (
      <section className="order-editor">

        <OrderSummary className="order-editor__summary" items={items} />

        {!hasVoucher && <VoucherForm
          className="order-editor__voucher-form"
          onAddVoucher={onAddVoucher}
        />}

        <Donation
          className="order-editor__donation"
          selectedDonation={donation}
          onAddDonation={onAddDonation}
          onCancelDonation={onCancelDonation} />

      </section>
    );
  }

}


function hasItemOfType(items, type) {
  return items.some(item => item.type === type);
}


function findDonation(items) {
  const donationItem = items.find(item => item.type === 'DONATION');
  if (!donationItem) {
    return null;
  }
  return donationItem.donationDetails;
}
