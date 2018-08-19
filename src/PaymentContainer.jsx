import React from "react";

import OrderEditor from "./OrderEditor";
import PaymentFormContainer from "./PaymentFormContainer";

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

  render() {
    const {
      items,
      onAddVoucher,
      onCancelVoucher,
      onAddInsurance,
      onCancelInsurance,
      onAddDonation,
      onCancelDonation,
      onPay
    } = this.props;

    const prices = items.map(item => item.price);
    const totalPrice = computeTotalPrice(prices);

    return (
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
          <PaymentFormContainer price={totalPrice} onPay={onPay} />
        </div>
      </section>
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
