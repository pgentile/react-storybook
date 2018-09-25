import React from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";
import PaymentProcessingModal from "./payment/PaymentProcessingModal";

export default class ModalContainer extends React.PureComponent {
  static propTypes = {
    currentModal: PropTypes.string,
    onClose: PropTypes.func.isRequired
  };

  onClose = () => {
    const { currentModal } = this.props;
    this.props.onClose(currentModal);
  };

  render() {
    const { currentModal } = this.props;

    switch (currentModal) {
      case "payment":
        return <PaymentProcessingModal />;
      case "expired":
        return (
          <Modal title="Expired">
            <p>Hello</p>
          </Modal>
        );
      case "expirationWarning":
        return (
          <Modal onClose={this.onClose} title="Expiration warning">
            <p>Hello</p>
          </Modal>
        );
      default:
        return null;
    }
  }
}
