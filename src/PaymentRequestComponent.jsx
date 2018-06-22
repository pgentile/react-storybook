import React from 'react';


const supportedPaymentMethods = [
  {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
    },
  }
];

const paymentDetails = {
  total: {
    label: 'Total',
    amount:{
      currency: 'EUR',
      value: 15
    }
  },
  displayItems: [
    {
      label: 'TER Clisson → Nantes',
      amount:{
        currency: 'EUR',
        value: 5
      }
    },
    {
      label: 'TGV Nantes → Paris',
      amount:{
        currency: 'EUR',
        value: 10
      }
    }
  ],
};

const options = {};

export default class PaymentRequestComponent extends React.PureComponent {

  request = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);

  componentDidMount() {
    this.pay();
  }

  render() {
    return null;
  }

  async pay() {
    const response = await this.request.show();
    await wait(5000);
    await response.complete('success');
  }

}


async function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
