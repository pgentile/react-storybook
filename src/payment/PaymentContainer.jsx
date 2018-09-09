import React, { Fragment } from "react";

import OrderEditor from "./OrderEditor";
import PaymentFormContainer from "./PaymentFormContainer";
import PaymentProcessingModal from "./PaymentProcessingModal";
import sleep from "../utils/sleep";

import "./PaymentContainer.scss";

export default class PaymentContainer extends React.PureComponent {
  static propTypes = {
    items: OrderEditor.propTypes.items,
    totalPrice: OrderEditor.propTypes.totalPrice,
    registredCards: PaymentFormContainer.propTypes.registredCards,
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
      totalPrice,
      registredCards,
      onAddVoucher,
      onCancelVoucher,
      onAddInsurance,
      onCancelInsurance,
      onAddDonation,
      onCancelDonation
    } = this.props;
    const { paymentModal } = this.state;

    return (
      <Fragment>
        <section className="payment-container">
          <div className="payment-container__left">
            <OrderEditor
              items={items}
              totalPrice={totalPrice}
              onAddVoucher={onAddVoucher}
              onCancelVoucher={onCancelVoucher}
              onAddInsurance={onAddInsurance}
              onCancelInsurance={onCancelInsurance}
              onAddDonation={onAddDonation}
              onCancelDonation={onCancelDonation}
            />
          </div>
          <div className="payment-container__right">
            <PaymentFormContainer totalPrice={totalPrice} registredCards={registredCards} onPay={this.onPay} />
          </div>
        </section>
        {paymentModal && <PaymentProcessingModal />}
      </Fragment>
    );
  }
}
