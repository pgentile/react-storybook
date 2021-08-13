import { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

import OrderSummary from "./OrderSummary";
import VoucherContainer from "./VoucherContainer";
import InsuranceContainer from "./InsuranceContainer";
import Donation from "./donation/Donation";
import { DONATION_TYPE, VOUCHER_TYPE, INSURANCE_TYPE } from "../redux/reducers/order";

import "./OrderEditor.scss";

export default class OrderEditor extends PureComponent {
  static propTypes = {
    items: OrderSummary.propTypes.items,
    onAddVoucher: VoucherContainer.propTypes.onAddVoucher,
    onCancelVoucher: PropTypes.func.isRequired,
    onAddInsurance: InsuranceContainer.propTypes.onAddInsurance,
    onCancelInsurance: PropTypes.func.isRequired,
    onAddDonation: Donation.propTypes.onAddDonation,
    onCancelDonation: Donation.propTypes.onCancelDonation,
  };

  render() {
    const { items, onAddVoucher, onCancelVoucher, onAddInsurance, onCancelInsurance, onAddDonation, onCancelDonation } =
      this.props;
    const hasVoucher = hasItemOfType(items, VOUCHER_TYPE);
    const hasInsurance = hasItemOfType(items, INSURANCE_TYPE);
    const donation = findItemOfType(items, DONATION_TYPE);

    const itemsWithActions = items.map((item) => {
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
        case INSURANCE_TYPE:
          return {
            ...item,
            onCancel: () => onCancelInsurance(),
          };
        default:
          return item;
      }
    });

    return (
      <section className="order-editor">
        <h1 className="order-editor__title">Récapitulatif</h1>

        <OrderSummary className="order-editor__summary" items={itemsWithActions} />

        {!hasInsurance && (
          <InsuranceContainer
            className="order-editor__insurance"
            onAddInsurance={onAddInsurance}
            onCancelInsurance={onCancelInsurance}
          />
        )}

        {!hasVoucher && (
          <VoucherContainer
            className="order-editor__voucher"
            onAddVoucher={onAddVoucher}
            onCancelVoucher={onCancelVoucher}
          />
        )}

        <Donation
          className="order-editor__donation"
          selectedDonation={donation}
          onAddDonation={onAddDonation}
          onCancelDonation={onCancelDonation}
        />
      </section>
    );
  }
}

function hasItemOfType(items, type) {
  return items.some((item) => item.type === type);
}

function findItemOfType(items, type) {
  const donationItem = items.find((item) => item.type === type);
  if (!donationItem) {
    return null;
  }

  const { code, association } = donationItem;
  return { code, association };
}
