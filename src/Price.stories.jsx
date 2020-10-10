import React from "react";

import Price from "./Price";

export default {
  title: "Price",
  component: Price,
  argTypes: {
    value: {
      description: "Valeur du montant",
      control: {
        type: "number",
      },
    },
    currency: {
      description: "Devise",
      control: {
        type: "select",
        options: ["EUR", "USD", "GBP", "CHF"],
      },
    },
    noColor: {
      desccription: "Pas de couleur",
    },
  },
};

// eslint-disable-next-line react/prop-types
const Template = ({ value, currency, ...other }) => <Price price={{ value, currency }} {...other} />;

export const Primary = Template.bind({});

Primary.args = {
  value: 10.9,
  currency: "EUR",
  noColor: false,
};

export const PrixEnPounds = Template.bind({});

PrixEnPounds.args = {
  ...Primary.args,
  currency: "GBP",
};

export const PrixEnFrancSuisse = Template.bind({});

PrixEnFrancSuisse.args = {
  ...Primary.args,
  currency: "CHF",
};

export const NoColor = Template.bind({});

NoColor.args = {
  ...Primary.args,
  noColor: true,
};

export const ExtraProp = Template.bind({});

ExtraProp.args = {
  ...Primary.args,
  "data-sample": "yes",
};
