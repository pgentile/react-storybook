import React from "react";
import { storiesOf } from "@storybook/react";

import ExchangeRate, { ExchangeRateConverter, ExchangeRateSwitcher } from "./ExchangeRate";
import Price from "./Price";
import ButtonGroup, { ButtonInGroup } from "./buttons/ButtonGroup";

storiesOf("ExchangeRate", module).add("main", () => {
  const price = { value: 10, currency: "EUR" };
  return (
    <ExchangeRate>
      <ExchangeRateSwitcher>
        {({ setCurrency }) => (
          <ButtonGroup>
            <ButtonInGroup onClick={() => setCurrency("CHF")}>To CHF</ButtonInGroup>
            <ButtonInGroup onClick={() => setCurrency("EUR")}>To EUR</ButtonInGroup>
            <ButtonInGroup onClick={() => setCurrency("GBP")}>To GBP</ButtonInGroup>
          </ButtonGroup>
        )}
      </ExchangeRateSwitcher>
      <p>
        <Price price={price} />
      </p>
      <p>
        <ExchangeRateConverter>{computeRate => <Price price={computeRate(price)} />}</ExchangeRateConverter>
      </p>
    </ExchangeRate>
  );
});
