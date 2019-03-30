import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import "./ExchangeRate.scss";

const ExchangeRateContext = createContext({
  baseCurrency: null,
  computeRate: () => null
});

export default function ExchangeRate({ children, baseCurrency: defaultBaseCurrency }) {
  const [expectedCurrency, setExpectedCurrency] = useState(defaultBaseCurrency || "EUR");
  const [baseCurrency, setBaseCurrency] = useState(expectedCurrency);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${expectedCurrency}`);
      const data = await response.json();
      setRates(data.rates);
      setBaseCurrency(expectedCurrency);
    };

    loadData();
  }, [expectedCurrency]);

  const computeRate = useCallback(
    ({ value, currency }) => {
      if (currency === baseCurrency) {
        return { value, currency };
      }
      const rate = rates[currency];
      if (!rate) {
        return { value, currency };
      }

      return { value: rate * value, currency: baseCurrency };
    },
    [baseCurrency, rates]
  );

  return (
    <ExchangeRateContext.Provider value={{ currency: baseCurrency, setCurrency: setExpectedCurrency, computeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

ExchangeRate.propTypes = {
  children: PropTypes.node,
  baseCurrency: PropTypes.string
};

ExchangeRate.defaultProps = {};

export function ExchangeRateConverter({ children }) {
  return <ExchangeRateContext.Consumer>{({ computeRate }) => children(computeRate)}</ExchangeRateContext.Consumer>;
}

ExchangeRateConverter.propTypes = {
  children: PropTypes.func.isRequired
};

export function ExchangeRateSwitcher({ children }) {
  return (
    <ExchangeRateContext.Consumer>
      {({ currency, setCurrency }) => children({ currency, setCurrency })}
    </ExchangeRateContext.Consumer>
  );
}

ExchangeRateSwitcher.propTypes = {
  children: PropTypes.func.isRequired
};
