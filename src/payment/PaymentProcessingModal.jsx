import React from "react";

import Overlay from "../Overlay";
import Card from "../Card";
import Spinner from "../Spinner";

import "./PaymentProcessingModal.scss";

export default class PaymentProcessingModal extends React.PureComponent {
  render() {
    return (
      <Overlay>
        <div className="payment-processing-modal" role="dialog" aria-modal="true">
          <Card hasBorder layer="pop-out">
            <h1>Paiement en cours&hellip;</h1>
            <Spinner />
          </Card>
        </div>
      </Overlay>
    );
  }
}
