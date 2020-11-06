import { IntlProvider } from "react-intl";
import AgeOrBirthDate from "./AgeOrBirthDate";

export default {
  title: "AgeOrBirthDate",
  component: AgeOrBirthDate,
  argTypes: {
    maxAge: {
      defaultValue: 120,
      control: { type: "number", min: 1, max: 120, step: 1 },
    },
    onChange: {
      action: "changed",
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="fr-FR" defaultLocale="fr-FR">
        <Story />
      </IntlProvider>
    ),
  ],
};

export const main = (args) => <AgeOrBirthDate {...args} />;
