import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Price from "./Price";
import FlatButton from "./FlatButton";

import "./Insurance.scss";

export default class Insurance extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onAddInsurance: PropTypes.func.isRequired
  };

  state = {
    price: {
      value: 12.9,
      currency: "€"
    }
  };

  onAddInsurance = () => {
    const { price } = this.state;
    this.props.onAddInsurance(price);
  };

  render() {
    const { className } = this.props;
    const { price } = this.state;

    return (
      <Card as="section" layer="flat" className={`insurance ${className}`}>
        <FlatButton className="insurance__question" onClick={this.onAddInsurance}>
          Assurez votre voyage, à partir de <Price price={price} />
        </FlatButton>
      </Card>
    );
  }
}
