import { Meta, Story } from "@storybook/react";
import Price, { Curreny } from "./Price";

type PriceStoryArgs = {
  [key: string]: unknown;
  value: number;
  currency: Curreny;
};

export default {
  title: "Price",
  component: Price,
  argTypes: {
    value: {
      defaultValue: 10.9,
      description: "Valeur du montant",
      control: "number",
    },
    currency: {
      defaultValue: "EUR",
      description: "Devise",
      control: {
        type: "select",
        options: ["EUR", "USD", "GBP", "CHF"],
      },
    },
    noColor: {
      defaultValue: false,
      control: "boolean",
      description: "Pas de couleur",
    },
  },
} as Meta<PriceStoryArgs>;

const Template: Story<PriceStoryArgs> = ({ value, currency, ...other }) => (
  <Price price={{ value, currency }} {...other} />
);

export const Primary = Template.bind({});

export const PrixEnPounds = Template.bind({});

PrixEnPounds.args = {
  currency: "GBP",
};

export const PrixEnFrancSuisse = Template.bind({});

PrixEnFrancSuisse.args = {
  currency: "CHF",
};

export const NoColor = Template.bind({});

NoColor.args = {
  noColor: true,
};

export const ExtraProp = Template.bind({});

ExtraProp.args = {
  "data-sample": "yes",
};
