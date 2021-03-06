import PropTypes from "prop-types";

import ExchangeRate, { useComputeRate, useCurrency } from "./ExchangeRate";
import Price from "./Price";
import ButtonGroup, { ButtonInGroup } from "./buttons/ButtonGroup";

export default {
  title: "ExchangeRate",
  component: ExchangeRate,
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  const price = { value: 10, currency: "EUR" };
  return (
    <ExchangeRate>
      <ExchangeRateSwitcher />
      <p>
        <Price price={price} />
      </p>
      <p>
        <ConvertiblePrice price={price} />
      </p>
    </ExchangeRate>
  );
};

function ExchangeRateSwitcher() {
  const currencies = ["EUR", "CHF", "GBP", "USD"];
  const [currency, setCurrency] = useCurrency();
  return (
    <ButtonGroup>
      {currencies.map((possibleCurrency) => (
        <ButtonInGroup
          key={possibleCurrency}
          toggled={currency === possibleCurrency}
          onClick={() => setCurrency(possibleCurrency)}
        >
          To {possibleCurrency}
        </ButtonInGroup>
      ))}
    </ButtonGroup>
  );
}

function ConvertiblePrice({ price }) {
  const computeRate = useComputeRate();
  return <Price price={computeRate(price)} />;
}

ConvertiblePrice.propTypes = {
  price: PropTypes.object.isRequired,
};
