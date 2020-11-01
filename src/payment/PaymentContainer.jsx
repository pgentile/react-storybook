import { PureComponent, Fragment } from "react";

import OrderEditorConnected from "./OrderEditorConnected";
import PaymentFormConnected from "./PaymentFormConnected";
import ModalContainerConnected from "../ModalContainerConnected";

import "./PaymentContainer.scss";

export default class PaymentContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <section className="payment-container">
          <div className="payment-container__left">
            <OrderEditorConnected />
          </div>
          <div className="payment-container__right">
            <PaymentFormConnected />
          </div>
        </section>
        <ModalContainerConnected />
      </Fragment>
    );
  }
}
