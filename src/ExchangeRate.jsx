import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import "./ExchangeRate.scss";

const ExchangeRateContext = createContext({
  baseCurrency: null,
  computeRate: () => null
});

export default function ExchangeRate({ children, baseCurrency: defaultBaseCurrency }) {
  const [baseCurrency, setBaseCurrency] = useState(defaultBaseCurrency || "EUR");
  const [rates, setRates] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
      const data = await response.json();
      setRates(data.rates);
    };

    loadData();
  }, [baseCurrency]);

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
    <ExchangeRateContext.Provider value={{ baseCurrency, setBaseCurrency, computeRate }}>
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
      {({ baseCurrency, setBaseCurrency }) => children({ baseCurrency, setBaseCurrency })}
    </ExchangeRateContext.Consumer>
  );
}

ExchangeRateSwitcher.propTypes = {
  children: PropTypes.func.isRequired
};
