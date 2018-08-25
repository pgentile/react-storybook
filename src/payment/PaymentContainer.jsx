import React, { Fragment } from "react";

import OrderEditor from "./OrderEditor";
import PaymentFormContainer from "./PaymentFormContainer";
import PaymentProcessingModal from "./PaymentProcessingModal";
import sleep from "../utils/sleep";

import "./PaymentContainer.scss";

export default class PaymentContainer extends React.PureComponent {
  static propTypes = {
    items: OrderEditor.propTypes.items,
    onAddVoucher: OrderEditor.propTypes.onAddVoucher,
    onCancelVoucher: OrderEditor.propTypes.onCancelVoucher,
    onAddInsurance: OrderEditor.propTypes.onAddInsurance,
    onCancelInsurance: OrderEditor.propTypes.onCancelInsurance,
    onAddDonation: OrderEditor.propTypes.onAddDonation,
    onCancelDonation: OrderEditor.propTypes.onCancelDonation,
    onPay: PaymentFormContainer.propTypes.onPay
  };

  state = {
    paymentModal: false
  };

  onPay = async values => {
    this.setState({ paymentModal: true });
    try {
      const payPromise = this.props.onPay(values);
      const delayForUserInformationPromise = sleep(20 * 1000);

      await Promise.all([payPromise, delayForUserInformationPromise]);

      return await payPromise;
    } finally {
      this.setState({ paymentModal: false });
    }
  };

  render() {
    const {
      items,
      onAddVoucher,
      onCancelVoucher,
      onAddInsurance,
      onCancelInsurance,
      onAddDonation,
      onCancelDonation
    } = this.props;
    const { paymentModal } = this.state;

    const prices = items.map(item => item.price);
    const totalPrice = computeTotalPrice(prices);

    return (
      <Fragment>
        <section className="payment-container">
          <div className="payment-container__left">
            <OrderEditor
              items={items}
              onAddVoucher={onAddVoucher}
              onCancelVoucher={onCancelVoucher}
              onAddInsurance={onAddInsurance}
              onCancelInsurance={onCancelInsurance}
              onAddDonation={onAddDonation}
              onCancelDonation={onCancelDonation}
            />
          </div>
          <div className="payment-container__right">
            <PaymentFormContainer price={totalPrice} onPay={this.onPay} />
          </div>
        </section>
        {paymentModal && <PaymentProcessingModal />}
      </Fragment>
    );
  }
}

function computeTotalPrice(prices) {
  if (prices.length === 0) {
    return {
      value: 0,
      currency: "€"
    };
  }

  return {
    value: prices.map(price => price.value).reduce((left, right) => left + right, 0),
    currency: prices[0].currency
  };
}
