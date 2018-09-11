import React from "react";

import OrderEditorConnected from "./OrderEditorConnected";
import PaymentFormConnected from "./PaymentFormConnected";

import "./PaymentContainer.scss";

export default class PaymentContainer extends React.PureComponent {
  render() {
    return (
      <section className="payment-container">
        <div className="payment-container__left">
          <OrderEditorConnected />
        </div>
        <div className="payment-container__right">
          <PaymentFormConnected />
        </div>
      </section>
    );
  }
}
