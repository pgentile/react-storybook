import { memo } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion/macro";
import { lighten } from "polished";

const baseColor = "black";

const Price = memo(function Price({ as: Element = "span", className = "", price, noColor = false, ...otherProps }) {
  const { value, currency } = price;

  const units = Math.abs(Math.trunc(value)) * (value >= 0 ? 1 : -1);
  const cents = Math.abs(Math.trunc((value * 100) % 100));
  const centsDisplay = cents < 10 ? `0${cents}` : cents.toString();
  const hasCents = cents > 0;

  return (
    <Element
      {...otherProps}
      className={cx(
        css([
          {
            fontSize: "1em",
            whiteSpace: "nowrap",
          },
          !noColor && {
            color: baseColor,
          },
        ]),
        className
      )}
      data-price-value={value}
      data-price-currency={currency}
    >
      {units}
      <span
        className={css([
          {
            fontSize: "0.8em",
          },
          !noColor && {
            color: lighten(0.3, baseColor),
          },
        ])}
      >
        {hasCents && <>,&thinsp;{centsDisplay}</>}
        &thinsp;
        {currencyToSymbol(currency)}
      </span>
    </Element>
  );
});

Price.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  noColor: PropTypes.bool,
  price: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default Price;

function currencyToSymbol(currency) {
  switch (currency) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "USD":
      return "$";
    default:
      return currency;
  }
}
