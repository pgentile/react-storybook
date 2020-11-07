import I18nSamples from "./I18nSamples";

export default {
  title: "I18n / I18nSamples",
  component: I18nSamples,
  argTypes: {
    sampleNumber: {
      defaultValue: 0,
      control: "number",
    },
    currency: {
      defaultValue: "EUR",
      description: "Devise",
      control: {
        type: "select",
        options: ["EUR", "USD", "CHF", "GBP"],
      },
    },
  },
  parameters: {
    storyshots: false,
  },
};

export const Main = (args) => <I18nSamples {...args} />;

Main.args = {
  sampleNumber: 0,
};
