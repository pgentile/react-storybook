import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faCcVisa from '@fortawesome/fontawesome-free-brands/faCcVisa';
import faCcMastercard from '@fortawesome/fontawesome-free-brands/faCcMastercard';
import faCcAmex from '@fortawesome/fontawesome-free-brands/faCcAmex';
import faCcAmazonPay from '@fortawesome/fontawesome-free-brands/faCcAmazonPay';
import faCcPaypal from '@fortawesome/fontawesome-free-brands/faCcPaypal';
import faCcApplePay from '@fortawesome/fontawesome-free-brands/faCcApplePay';

import SuperRadio from './SuperRadio';


storiesOf('SuperRadio', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <SuperRadio
        label={text('Label', 'Radio button')}
        description={text('Description', 'This is my radio button')}
        onChange={action('on checked change')}
        help={boolean('Help', false)}
        checked={boolean('Checked', false)}
        icon={faCoffee} />
    );
  })
  .add('without icon', () => {
    return (
      <SuperRadio
        label="Radio button"
        description="This is my radio button" />
    );
  })
  .add('example', () => {
    return (
      <Example />
    );
  });


class Example extends React.Component {

  state = {
    selectedRadioIndex: null,
  };

  onChangeAction = (index) => () => {
    this.setState({
      selectedRadioIndex: index,
    });
  };

  render() {
    const { selectedRadioIndex } = this.state;

    const cards = [
      {
        label: 'Visa',
        icon: faCcVisa,
      },
      {
        label: 'Mastercard',
        icon: faCcMastercard,
      },
      {
        label: 'American Express',
        icon: faCcAmex,
      },
      {
        label: 'Paypal',
        icon: faCcPaypal,
      },
      {
        label: 'Amazon Pay',
        icon: faCcAmazonPay,
      },
      {
        label: 'Apple Pay',
        icon: faCcApplePay,
      },
    ];

    return cards.map((card, index) => (
      <SuperRadio
        key={index}
        label={card.label}
        description={`Payez avec ${card.label}`}
        onChange={this.onChangeAction(index)}
        checked={selectedRadioIndex === index}
        icon={card.icon}
        help={true} />
    ));
  }

}
