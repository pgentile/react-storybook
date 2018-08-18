import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import PaymentRequestComponent from "./PaymentRequestComponent";

storiesOf("PaymentRequestComponent", module).add("main", () => {
  return <Story />;
});

class Story extends React.PureComponent {
  state = {
    requesting: false
  };

  pay = () => {
    this.setState({
      requesting: true
    });
  };

  reset = () => {
    this.setState({
      requesting: false
    });
  };

  render() {
    const { requesting } = this.state;

    return (
      <Fragment>
        <button onClick={this.pay}>Payer</button>
        {requesting && <PaymentRequestComponent onSuccess={this.reset} onError={this.reset} />}
      </Fragment>
    );
  }
}
