import React from "react";
import { storiesOf } from "@storybook/react";

import Price from "./Price";

const values = [0, 12, 21.9, 35.2, 46.5, -10.9, -45.2];

const stories = storiesOf("Price", module);

values.forEach(value => {
  stories.add(`Prix - Valeur de ${value} €`, () => {
    return <Price price={{ value, currency: "EUR" }} />;
  });
});

stories.add(`Prix - En pounds`, () => {
  return <Price price={{ value: 135.9, currency: "GBP" }} />;
});

stories.add(`Prix - En franc suisse`, () => {
  return <Price price={{ value: 135.9, currency: "CHF" }} />;
});
