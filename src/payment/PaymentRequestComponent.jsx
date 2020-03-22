import React from "react";
import PropTypes from "prop-types";

import sleep from "../utils/sleep";

const supportedPaymentMethods = [
  {
    supportedMethods: "basic-card",
    data: {
      supportedNetworks: ["visa", "mastercard", "amex", "cb", "maestro"],
    },
  },
];

const paymentDetails = {
  total: {
    label: "Total",
    amount: {
      currency: "EUR",
      value: 85,
    },
  },
  displayItems: [
    {
      label: "TER Clisson → Nantes — 2 passagers",
      amount: {
        currency: "EUR",
        value: 5,
      },
    },
    {
      label: "TGV Nantes → Paris — 2 passagers",
      amount: {
        currency: "EUR",
        value: 80,
      },
    },
  ],
};

const options = {};

export default class PaymentRequestComponent extends React.PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  };

  // eslint-disable-next-line compat/compat
  request = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);

  componentDidMount() {
    this.pay();
  }

  render() {
    return null;
  }

  async pay() {
    const { onSuccess, onError } = this.props;

    let success = false;
    try {
      const response = await this.request.show();
      console.info("Credit card info:", JSON.stringify(response));
      await sleep(5000);
      await response.complete("success");
      success = true;
    } catch (e) {
      onError(e);
    } finally {
      if (success) {
        onSuccess();
      }
    }
  }
}
