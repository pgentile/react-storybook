import { PureComponent } from "react";

import Spinner from "../Spinner";
import Modal from "../Modal";

import "./PaymentProcessingModal.scss";

export default class PaymentProcessingModal extends PureComponent {
  render() {
    return (
      <Modal title="Paiement en cours...">
        <p>Votre paiement est en cours de traitement&hellip;</p>
        <Spinner />
      </Modal>
    );
  }
}
