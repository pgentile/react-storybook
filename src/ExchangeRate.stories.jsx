import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import ExchangeRate, { ExchangeRateConverter, ExchangeRateSwitcher } from "./ExchangeRate";
import Price from "./Price";

storiesOf("ExchangeRate", module).add("main", () => {
  const price = { value: 10, currency: "EUR" };
  return (
    <ExchangeRate>
      <p>
        <ExchangeRateSwitcher>
          {({ setBaseCurrency }) => (
            <Fragment>
              <button onClick={() => setBaseCurrency("CHF")}>To CHF</button>{" "}
              <button onClick={() => setBaseCurrency("EUR")}>To EUR</button>{" "}
              <button onClick={() => setBaseCurrency("GBP")}>To GBP</button>
            </Fragment>
          )}
        </ExchangeRateSwitcher>
      </p>
      <p>
        <Price price={price} />
      </p>
      <p>
        <ExchangeRateConverter>{computeRate => <Price price={computeRate(price)} />}</ExchangeRateConverter>
      </p>
    </ExchangeRate>
  );
});
