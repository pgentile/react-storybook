import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import OrderSummary from './OrderSummary';
import VoucherContainer from './VoucherContainer';
import Donation from './Donation';
import { DONATION_TYPE, VOUCHER_TYPE } from './redux/reducers/payment';

import './OrderEditor.scss';


export default class OrderEditor extends React.PureComponent {

  static propTypes = {
    items: OrderSummary.propTypes.items,
    onAddVoucher: VoucherContainer.propTypes.onAddVoucher,
    onCancelVoucher: PropTypes.func.isRequired,
    onAddDonation: Donation.propTypes.onAddDonation,
    onCancelDonation: Donation.propTypes.onCancelDonation,
  };

  render() {
    const { items, onAddVoucher, onCancelVoucher, onAddDonation, onCancelDonation } = this.props;
    const hasVoucher = hasItemOfType(items, VOUCHER_TYPE);
    const donation = findDonation(items);

    const itemsWithActions = items.map(item => {
      switch (item.type) {
      case VOUCHER_TYPE:
        return {
          ...item,
          label: (
            <Fragment>
              Code promotion <b>{item.code}</b> appliqué
            </Fragment>
          ),
          onCancel: () => onCancelVoucher(),
        };
      case DONATION_TYPE:
        return {
          ...item,
          label: (
            <Fragment>
              Votre don pour <b>{item.association}</b>
            </Fragment>
          ),
          onCancel: () => onCancelDonation(),
        };
      default:
        return item;
      }
    });

    return (
      <section className="order-editor">

        <OrderSummary className="order-editor__summary" items={itemsWithActions} />

        {!hasVoucher && <VoucherContainer
          className="order-editor__voucher-form"
          onAddVoucher={onAddVoucher}
          onCancelVoucher={onCancelVoucher} />}

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
  const donationItem = items.find(item => item.type === DONATION_TYPE);
  if (!donationItem) {
    return null;
  }

  const { code, association } = donationItem;
  return { code, association };
}
