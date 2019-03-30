import React from "react";
import PropTypes from "prop-types";

import "./Price.scss";
import bemModifiers from "./utils/bemModifiers";

export default class Price extends React.PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    noColor: PropTypes.bool,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    as: "span",
    className: "",
    noColor: false
  };

  render() {
    const { as: Element, className, price, noColor } = this.props;
    const { value, currency } = price;

    const units = Math.trunc(value);
    const cents = Math.abs(Math.trunc((value * 100) % 100));
    const centsDisplay = cents < 10 ? `0${cents}` : cents.toString();

    const realClassName = bemModifiers("price", {
      "no-color": noColor
    });

    return (
      <Element className={`${realClassName} ${className}`} data-price-value={value} data-price-currency={currency}>
        <span className="price__units">{units}</span>
        <span className="price__remaining">
          ,&thinsp;
          {centsDisplay}
          &nbsp;
          {currencyToSymbol(currency)}
        </span>
      </Element>
    );
  }
}

function currencyToSymbol(currency) {
  switch (currency) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency;
  }
}
