import { AllHTMLAttributes, ElementType, memo, ReactElement } from "react";
import { css, cx } from "@emotion/css/macro";
import { lighten } from "polished";

const baseColor = "black";

export type Curreny = "EUR" | "GBP" | "USD" | "CHF";

export type Price = {
  value: number;
  currency: Curreny;
};

export type PriceProps = AllHTMLAttributes<HTMLElement> & {
  as?: ElementType;
  className?: string;
  price: Price;
  noColor?: boolean;
};

export default memo(function Price({
  as: Element = "span",
  className = "",
  price,
  noColor = false,
  ...otherProps
}: PriceProps): ReactElement {
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

function currencyToSymbol(currency: Curreny): string {
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
